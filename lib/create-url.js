'use strict'

module.exports = function createUrl (root, route) {
  // ensure our root doesn't end in / since each route will add that
  root = root.trim()
  if (root[root.length - 1] === '/') root = root.slice(0, -1)

  route = route.trim()
  // ensure our route starts and ends with `/` otherwise ab will be sad :(
  if (route[0] !== '/') route = '/' + route
  if (route[route.length - 1] !== '/') route = route + '/'
  return root + route
}
