'use strict'

module.exports = (function () {
  var app = require('restify').createServer()
  app.get('/', function (req, res) { })
  app.post('/', function (req, res) { })
  app.get('/admin', function (req, res) { })
  app.post('/admin', function (req, res) { })
  app.get('/duplicate', function (req, res) { })
  app.get('/duplicate/:id', function (req, res) { })
  app.post('/foo', function (req, res) { })
  app.put('/nooo', function (req, res) { })

  return app
})()
