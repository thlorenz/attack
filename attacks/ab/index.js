'use strict'

var path = require('path')
var fs = require('fs')
var handlebars = require('handlebars')
var invalidJson = require('./invalid-json')
var xtend = require('xtend')

var templateFile = path.join(__dirname, path.basename(__filename, '.js') + '.hbs')
var templateString = fs.readFileSync(templateFile, 'utf8')
var template = handlebars.compile(templateString)

function createUrl (root, route) {
  // ensure our root doesn't end in / since each route will add that
  root = root.trim()
  if (root[root.length - 1] === '/') root = root.slice(0, -1)

  route = route.trim()
  // ensure our route starts and ends with `/` otherwise ab will be sad :(
  if (route[0] !== '/') route = '/' + route
  if (route[route.length - 1] !== '/') route = route + '/'
  return root + route
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
 * @param {Object=} opts.invalidJson options to tweak the @see ./invalid-json.js attack
 */
exports = module.exports = function ab (root, routes, opts) {
  opts = opts || {}
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
        xtend(opts.invalidJson, {
          method: method,
          put: method === 'PUT',
          path: route.path,
          resultFile: opts.resultFile
        }))
    }
  }

  return template({ attacks: attacks })
    .replace(/&#x27;/g, "'")
    .replace(/&gt;/g, '>')
}
