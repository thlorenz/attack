'use strict'

var relevantMethods = [ 'GET', 'POST', 'PUT', 'DELETE', 'PATCH' ]

function upperCase (x) {
  return x.toUpperCase()
}

function isRelevantMethod (k) {
  return ~relevantMethods.indexOf(k.toUpperCase())
}

function sortMethods (x) {
  return { path: x.path, methods: x.methods.sort() }
}

function getRouteInfo (x) {
  if (!x.route) return null

  var methods = x.route.methods
    ? Object.keys(x.route.methods)
        .map(upperCase)
        .filter(isRelevantMethod)
    : []
  return { path: x.route.path, methods: methods }
}

function hashToArray (hash) {
  return Object.keys(hash)
    .reduce(function toArray (acc, k) {
      acc.push(hash[k])
      return acc
    }, [])
}

function defined (x) { return !!x }
function byPath (a, b) { return a.path > b.path }

function getHashedByMethodRoutes (allRoutes, getPath) {
  var hash = Object.keys(allRoutes)
    .filter(isRelevantMethod)
    .reduce(function byMethod (acc, k) {
      var routes = allRoutes[k]
      var method = k.toUpperCase()
      acc.push(
        routes
          .sort(byPath)
          .map(function (x) {
            return { path: getPath(x), method: method }
          })
      )
      return acc
    }, [])
    .reduce(function byPath (acc, vals) {
      for (var i = 0; i < vals.length; i++) {
        var val = vals[i]
        if (!acc[val.path]) {
          acc[val.path] = { path: val.path, methods: [ val.method ] }
        } else {
          acc[val.path].methods.push(val.method)
        }
      }
      return acc
    }, {})

  return hashToArray(hash).map(sortMethods)
}

function getExpress3Path (x) {
  return x.path
}

function getExpress3Routes (app) {
  var allRoutes = app.routes
  return getHashedByMethodRoutes(allRoutes, getExpress3Path)
}

function getExpress4Routes (app) {
  function condenseMethods (routes) {
    var hash = {}
    for (var i = 0; i < routes.length; i++) {
      var route = routes[i]
      if (!hash[route.path]) {
        hash[route.path] = route
      } else {
        hash[route.path].methods = hash[route.path].methods.concat(route.methods)
      }
    }
    return hashToArray(hash).map(sortMethods)
  }

  var uncondensed = app._router.stack
    .map(getRouteInfo)
    .filter(defined)

  return condenseMethods(uncondensed).sort(byPath)
}

function getRestify4Path (x) {
  return x.spec.path
}
function getRestifyRoutes (app) {
  // checked for version 3 and 4
  var allRoutes = app.router.routes
  return getHashedByMethodRoutes(allRoutes, getRestify4Path)
}

function getExpressRoutes (app) {
  var version = require('express/package.json').version
  if (version.slice(0, 1) === '4') return getExpress4Routes(app)
  if (version.slice(0, 1) === '3') return getExpress3Routes(app)
}

/**
 * Attempts to extract all routes of the given app.
 *
 * @name extractRoutes
 * @private
 * @function
 * @param {Object} app server/app that has routes mounted
 * @param {Object} type type of the server/framework @see ./detect-type
 * @return {Object} a hash of all discovered routes and their methods
 */
module.exports = function extractRoutes (app, type) {
  if (type === 'express') return getExpressRoutes(app)
  if (type === 'restify') return getRestifyRoutes(app)
  throw new Error('Unsupported type ' + type)
}
