'use strict'

/**
 * Attempts to detect the server/framework type used
 * in order to correctly extract the routes from it.
 *
 * @name detectType
 * @private
 * @function
 * @param {Object} app the server created via http or the framework
 * @return {String} the type, i.e. 'express' or 'unknown type' if undetectable
 */
module.exports = function detectType (app) {
  var expressFunctions = [ 'mkcalendar', 'mkactivity', 'engine' ]
  var failed = false
  var fnName
  for (var i = 0; i < expressFunctions.length; i++) {
    fnName = expressFunctions[i]
    if (typeof app[fnName] !== 'function') {
      console.log(fnName)
      failed = true
      break
    }
  }
  if (!failed) return 'express'
  return 'unknown type'
}
