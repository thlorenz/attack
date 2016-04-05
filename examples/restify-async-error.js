'use strict'

var restify = require('restify')
var path = require('path')
var fs = require('fs')

var app = restify.createServer()
app.use(restify.bodyParser())
app.get('/', function (req, res) {
  res.send('OK')
})
app.get('/admin', function (req, res) {
  res.send('OK')
})
app.post('/find-user', function (req, res) {
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
  app.listen(5003, onlistening)
}
