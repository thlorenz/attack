'use strict'

var path = require('path')
var fs = require('fs')
var siege = require('../attacks/siege')._defaultOpts
var ab = require('../attacks/ab')._defaultOpts

var config = {
  siege: siege,
  ab: ab
}

function nullify (k) {
  if (typeof this[k] === 'undefined') this[k] = null
}

// JSON has no concept of undefined
Object.keys(siege).forEach(nullify, siege)
Object.keys(ab).forEach(nullify, ab)

var json = JSON.stringify(config, null, 2)
var file = path.join(__dirname, '..', 'attacks', 'default-config.json')
fs.writeFileSync(file, json, 'utf8')
