'use strict'

var test = require('tape')
var path = require('path')
var fs = require('fs')
var exists = fs.existsSync || fs.accessSync
var spok = require('spok')
var writeRoutes = require('../../lib/write-routes')
var file = path.join(__dirname, '..', 'results', 'attack-routes.json')

function removeFile () {
  if (exists(file)) fs.unlinkSync(file)
}

test('\nsetup', function (t) {
  removeFile()
  t.end()
})

test('\nwhen I have a bunch of express routes without supplying type it correctly writes them', function (t) {
  var app = require('../util/express-app')
  writeRoutes(app, { file: file })
  var res = require(file)
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

test('\ncleanup', function (t) {
  removeFile()
  t.end()
})
