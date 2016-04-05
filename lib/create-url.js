'use strict'

function removeEndSlash (s) {
  s = s.trim()
  if (s[s.length - 1] === '/') s = s.slice(0, -1)
  return s
}

function ensureEndSlash (s) {
  s = s.trim()
  if (s[s.length - 1] !== '/') s = s + '/'
  return s
}

exports = module.exports = function createUrl (root, route) {
  // ensure our root doesn't end in / since each route will add that
  root = removeEndSlash(root)
  route = route.trim()
  // ensure our route starts and ends with `/` otherwise ab will be sad :(
  if (route[0] !== '/') route = '/' + route
  route = ensureEndSlash(route)
  return root + route
}

exports.ensureEndSlash = ensureEndSlash
