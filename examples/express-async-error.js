'use strict'

var express = require('express')
var path = require('path')
var fs = require('fs')

var app = express()
  .use(require('body-parser').json())
  .get('/', function (req, res) {
    res.send('OK')
  })
  .get('/admin', function (req, res) {
    res.send('OK')
  })
  .post('/find-user', function (req, res) {
    function onuserFile (err, src) {
      if (err) {
        console.error(err)
        return res.status(500).send('BOOM')
      }
      var name = req.body.user.name
      // now find it in the source
      res.send('Found ' + name)
    }
    fs.readFile(path.join(__dirname, 'users.txt'), 'utf8', onuserFile)
  })

function onlistening () {
  console.log('Listening on port %d', this.address().port)
}

if (process.env.ROUTES_ONLY) {
  var attack = require('../')
  attack.writeRoutes(app)
} else {
  app.listen(5002, onlistening)
}
