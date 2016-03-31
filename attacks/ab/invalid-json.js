'use strict'

var path = require('path')
var fs = require('fs')
var handlebars = require('handlebars')
var xtend = require('xtend')

var templateFile = path.join(__dirname, path.basename(__filename, '.js') + '.hbs')
var templateString = fs.readFileSync(templateFile, 'utf8')
var template = handlebars.compile(templateString)

function fullPath (file) {
  return path.join(__dirname, 'invalid-json', file + '.json')
}

var defaultJsonFiles = [
  'empty',
  'empty-string',
  'empty-object',
  'empty-array',
  'unclosed-string',
  'unclosed-object',
  'unclosed-array',
  'user-null',
  'user-empty-object',
  'user-empty-string'
].map(fullPath)

var defaultOpts = {
  authorization: undefined,
  concurrency: 5,
  requests: 50,
  url: undefined
}

/**
 * Generates ab requests with invalid or tricky JSON payloads for the given url
 * Support POST and PUT methods
 *
 * @name invalidJson
 * @private
 * @function
 * @param {Object} opts options to configure ab request
 * @param {String=} opts.authorization authorization string if required, i.e. 'Authorization: Token abcd1234'
 * @param {Number=} opts.concurrency how many requests to fire in parallel, default: 10
 * @param {Number=} opts.requests how many requests to fire, default: 1000
 * @param {String} opts.url url at which to fire the requests
 * @param {Array.<String>=} opts.jsonFiles full paths to JSON files to use as tricky payloads on top of the ones * included
 * @return {String} ab commands to be added to the attack shell script
 */
exports = module.exports = function invalidJson (opts) {
  if (!opts) throw new Error('Need to supply opts with url parameter at the least')

  // don't just overwrite jsonFiles if supplied, but add them to the default ones
  var jsonFiles = opts.jsonFiles
    ? defaultJsonFiles.concat(opts.jsonFiles)
    : defaultJsonFiles

  opts = xtend({}, defaultOpts, opts, { jsonFiles: jsonFiles })
  if (!opts.url) throw new Error('Need url')
  return template(opts)
}

exports.methods = [ 'POST', 'PUT' ]
