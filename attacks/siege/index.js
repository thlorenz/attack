/* eslint-disable comma-style, operator-linebreak, space-unary-ops, no-multi-spaces, key-spacing, indent */
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
    acceptEncoding : 'gzip'
  , authorization  : undefined
  , concurrency    : 5
  , internet       : true
  , keepAlive      : true
  , loginUrl       : undefined
  , requests       : 20
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
 * @param {String=} opts.authorization login/authorization string used in the .siegerc configuration, default: `undefined`
 * @param {String=} opts.loginUrl loginurl used in the .siegerc configuration, default: `undefined`
 * @param {Number=} opts.concurrency concurrency of requests send by siege for each url, default: `5`
 * @param {Number=} opts.requests number of requests send by siege for each url, default: `20`
 * @param {Boolean=} opts.keepAlive if true keep-alive is configured for siege, default: `true`
 * @param {Boolean=} opts.internet if true siege is configured to submit random requests (simulating internet usage), default: `true`
 * @param {String=} opts.acceptEncoding accept-encoding specified in .siegerc configuration, default: `'gzip'`
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
exports._defaultOpts = defaultOpts
