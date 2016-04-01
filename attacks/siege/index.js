'use strict'

var createUrls = require('./create-urls')
var path = require('path')
var fs = require('fs')
var xtend = require('xtend')

var handlebars = require('handlebars')
var templateFile = path.join(__dirname, 'siegerc.hbs')
var templateString = fs.readFileSync(templateFile, 'utf8')
var template = handlebars.compile(templateString)

var defaultOpts = {
  authorization: undefined,
  loginUrl: undefined,
  concurrency: 5,
  requests: 20,
  keepAlive: true,
  // Internet simulation. If true, siege clients will hit
  // the URLs in the urls.txt file randomly, thereby simulating
  // internet usage.
  internet: true,
  acceptEncoding: 'gzip'
}

/**
 * Generates a urls file and an rc file for [siege](https://www.joedog.org/siege-manual/)
 * (brew install siege)
 *
 * @name attack::siege
 * @function
 * @param {String} root root url of the server to attack, i.e. http://localhost:3000
 * @param {Array.<Object>} routes collected via @see ./lib/write-routes.js
 * @param {Object=} opts options to tweak each attack
 */
exports = module.exports = function siege (root, routes, opts) {
  opts = opts || {}
  var urls = createUrls(root, routes)

  var urlsFile = opts.urlsFile || path.resolve('attack-siege-urls.txt')
  fs.writeFileSync(urlsFile, urls.join('\n'), 'utf8')

  var rc = template(xtend({}, defaultOpts, {
    method: 'GET',
    urlsFile: urlsFile
  }))

  var rcFile = opts.rcFile || path.resolve('attack-siegerc')
  fs.writeFileSync(rcFile, rc, 'utf8')
  return rcFile
}
