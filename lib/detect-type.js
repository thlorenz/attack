'use strict'

function hasFunctions (app, fns) {
  var failed = false
  var fnName
  for (var i = 0; i < fns.length; i++) {
    fnName = fns[i]
    if (typeof app[fnName] !== 'function') {
      failed = true
      break
    }
  }
  return !failed
}

function isExpress (app) {
  return hasFunctions(app, [ 'mkactivity', 'engine' ])
}

function isRestify (app) {
  return hasFunctions(app, [ '_setupRequest', '_route' ])
}

/**
 * Attempts to detect the server/framework type used
 * in order to correctly extract the routes from it.
 * Currently detects Express and Restify
 *
 * @name detectType
 * @private
 * @function
 * @param {Object} app the server created via http or the framework
 * @return {String} the type, i.e. 'express' or 'unknown type' if undetectable
 */
module.exports = function detectType (app) {
  if (isExpress(app)) return 'express'
  if (isRestify(app)) return 'restify'
  return 'unknown type'
}
