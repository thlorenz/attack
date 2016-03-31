'use strict'

var express = require('express')
var app = express()
  .use(require('body-parser')())
  .get('/', function (req, res) {
    res.send('OK')
  })
  .get('/admin', function (req, res) {
    res.send('OK')
  })
  .get('/duplicate', function (req, res) {
    res.send('OK')
  })
  .get('/duplicate/:id', function (req, res) {
    res.send('OK')
  })
  .post('/register-user', function (req, res) {
    var name = req.body.user.name
    // express protects the app from blowing up entirely (https://github.com/expressjs/express/blob/f3d99a4fdbe1531ea609e92c4d4ae6c269d78c7a/lib/router/layer.js#L94-L98)
    // but once we reach the error handler we have less info about what happened
    res.send('OK - registered ' + name)
  })
  .all('/all', function (req, res) {
    res.send('OK')
  })

function onlistening () {
  console.log('Listening on port %d', this.address().port)
}

if (process.env.ROUTES_ONLY) {
  var attack = require('../')
  attack.writeRoutes(app)
} else {
  app.listen(5001, onlistening)
}
