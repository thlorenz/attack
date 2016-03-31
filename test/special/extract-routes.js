'use strict'

var test = require('tape')
var spok = require('spok')
var extractRoutes = require('../../lib/extract-routes')

test('\nwhen I have a bunch of express routes it correctly extracts them', function (t) {
  var app = require('../util/express-app')
  var res = extractRoutes(app, 'express')
  spok(t, res, [
    { path: '/', methods: [ 'GET', 'POST' ] },
    { path: '/admin', methods: [ 'GET', 'POST' ] },
    { path: '/all',
      methods: [ 'DELETE', 'GET', 'PATCH', 'POST', 'PUT' ] },
    { path: '/duplicate', methods: [ 'GET' ] },
    { path: '/duplicate/:id', methods: [ 'GET' ] },
    { path: '/foo', methods: [ 'POST' ] },
    { path: '/nooo', methods: [ 'PUT' ] } ]
  )
  t.end()
})
