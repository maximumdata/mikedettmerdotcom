let express = require('express'),
    path = require('path'),
    http = require('http'),
    favicon = require('serve-favicon'),
    database = require('../config/db.js'),
    routes = require('./routes/router.js'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    jwt = require('jwt-simple'),
    morgan = require('morgan');


const app = express();
app.use(morgan('dev'));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

require('../config/passport')(passport);

app.use('/', routes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.set('port', 2528);

const server = http.createServer(app);

server.listen(app.get('port'));
server.on('listening', () => {
  console.log('Listening on port: ' + app.get('port'));
});
