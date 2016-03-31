'use strict'

var extract = require('./extract-routes')
var detect = require('./detect-type')
var path = require('path')
var fs = require('fs')

/**
 * Writes the routes found on the given app.
 *
 * **Warning**: this function throws if the app's type cannot be detected
 * **Warning**: this function synchronously writes the routes to the file system
 *
 * Therefore please run this only during server initialization **after** all routes were installed
 *
 * @name attack::writeRoutes
 * @function
 * @param {Object} app the app/server on which the routes are mounted
 * @param {Object=} opts options
 * @param {Object=} opts.type the type of the server/framework, will be detected if not supplied
 * @param {Object=} opts.file path to JSON file to write routes to, `./attack-routes.json` if not supplied
 */
module.exports = function writeRoutes (app, opts) {
  opts = opts || {}
  var p = opts.file
    ? path.resolve(process.cwd(), opts.file)
    : path.join(process.cwd(), 'attack-routes.json')
  var type = opts.type || detect(app)
  if (type === 'unknown type') throw new Error('Unable to detect server type of app')
  var routes = extract(app, type)
  var json = JSON.stringify(routes, null, 2)
  fs.writeFileSync(p, json, 'utf8')
}
