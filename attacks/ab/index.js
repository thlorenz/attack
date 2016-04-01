/* eslint-disable comma-style, operator-linebreak, space-unary-ops, no-multi-spaces, key-spacing, indent */
'use strict'

var path = require('path')
var fs = require('fs')
var handlebars = require('handlebars')
var invalidJson = require('./invalid-json')
var createUrl = require('../../lib/create-url')
var xtend = require('xtend')

var templateFile = path.join(__dirname, path.basename(__filename, '.js') + '.hbs')
var templateString = fs.readFileSync(templateFile, 'utf8')
var template = handlebars.compile(templateString)

var defaultOpts = {
    authorization : undefined
  , concurrency   : 5
  , jsonFiles     : undefined
  , keepAlive     : false
  , requests      : 50
  , url           : undefined
  , resultFile    : 'ab-results.txt'
}

function genInvalidJsonAttack (url, method, opts) {
  var supportedMethods = invalidJson.methods
  if (!~supportedMethods.indexOf(method)) return ''

  return invalidJson(xtend({ url: url, method: method }, opts))
}

/**
 * Generates a shell script that runs various **ab** commands in order to expose
 * ways that an application could be crashed.
 *
 * @name attack::ab
 * @function
 * @param {String} root root url of the server to attack, i.e. http://localhost:3000
 * @param {Array.<Object>} routes collected via @see ./lib/write-routes.js
 * @param {Object=} opts options to tweak each attack
 * @param {String=} opts.authorization authorization string if required, i.e. 'Authorization: Token abcd1234'
 * @param {Number=} opts.concurrency how many requests to fire in parallel, default: 5
 * @param {Number=} opts.requests how many requests to fire, default: 50
 * @param {String} opts.url url at which to fire the requests
 * @param {String} opts.resultFile file to which ab results are piped
 * @param {Boolean=} opts.keepAlive if true keep-alive is configured for ab, default: `true`
 * @param {Array.<String>=} opts.jsonFiles full paths to JSON files to use as tricky payloads on top of the ones included
 */
exports = module.exports = function ab (root, routes, opts) {
  opts = xtend({}, defaultOpts, opts)
  opts.resultFile = path.resolve(opts.resultFile)
  var attacks = ''
  var route
  var url
  var method

  for (var i = 0; i < routes.length; i++) {
    route = routes[i]
    url = createUrl(root, route.path)
    for (var j = 0; j < route.methods.length; j++) {
      method = route.methods[j]
      attacks += genInvalidJsonAttack(
        url,
        method,
        xtend(opts, {
            method : method
          , put    : method === 'PUT'
          , path   : route.path
          , url    : root
        }))
    }
  }

  return template({ attacks: attacks })
    .replace(/&#x27;/g, "'")
    .replace(/&gt;/g, '>')
}
exports._defaultOpts = defaultOpts
