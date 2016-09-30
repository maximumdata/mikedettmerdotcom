let express = require('express')
let path = require('path')
let http = require('http')
let routes = require('./routes/router.js')
let bodyParser = require('body-parser')
let passport = require('passport')
let morgan = require('morgan')

const app = express()
app.use(morgan('dev'))
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// app.use(require('node-sass-middleware')({
//   src: path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   indentedSyntax: true,
//   sourceMap: true
// }))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use(passport.initialize())

require('../config/passport')(passport)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/', routes)

app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  if (req.accepts('json')) {
    res.status(404).json(err)
  }
  res.status(404).send('Invalid Route')
})

app.set('port', 2528)

const server = http.createServer(app)

server.listen(app.get('port'))
server.on('listening', () => {
  console.log('Listening on port: ' + app.get('port'))
})
