'use strict'

module.exports = require('express')()
  .get('/', function (req, res) { })
  .post('/', function (req, res) { })
  .get('/admin', function (req, res) { })
  .post('/admin', function (req, res) { })
  .get('/duplicate', function (req, res) { })
  .get('/duplicate/:id', function (req, res) { })
  .post('/foo', function (req, res) { })
  .put('/nooo', function (req, res) { })
  .all('/all', function (req, res) { })
