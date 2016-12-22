var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon')
var logger = require('morgan')
var bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let session = require('cookie-session')
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy

var index = require('./routes/index')
let post = require('./routes/post')
var users = require('./routes/users')
let admin = require('./routes/admin')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
  name: 'session',
  keys: ['play me', 'off key', 'board cat'],

  // Cookie Options
  maxAge: .5 * (60 * 60 * 1000) // half hour
}))
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(passport.initialize())
app.use(passport.session())

let Account = require('./models/account')
passport.use(new LocalStrategy(Account.authenticate()))

passport.serializeUser(Account.serializeUser())
passport.deserializeUser(Account.deserializeUser())

app.use('/', index)
app.use('/post', post)
app.use('/admin', admin)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
