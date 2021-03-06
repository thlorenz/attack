'use strict'

var test = require('tape')
var detectType = require('../../lib/detect-type')

test('\ndetects unknown as "unknown type"', function (t) {
  var app = {}
  t.equal(detectType(app), 'unknown type')
  t.end()
})

test('\ndetects express app', function (t) {
  var app = require('express')()
  t.equal(detectType(app), 'express')
  t.end()
})

test('\ndetects restify app', function (t) {
  var app = require('../util/restify-app')
  t.equal(detectType(app), 'restify')
  t.end()
})
