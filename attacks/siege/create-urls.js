'use strict'

var createUrl = require('../../lib/create-url')

function hasGet (x) {
  return ~x.methods.indexOf('GET')
}

function toUrl (x) {
  return createUrl(this, x.path)
}

module.exports = function createUrls (root, routes) {
  return routes
    .filter(hasGet)
    .map(toUrl, root)
}
