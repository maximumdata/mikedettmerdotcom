const app = require('express')();
const bodyParser = require('body-parser');

const posts = require('./routes/posts.routes');
const connect = require('./db/connect');

connect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/v1', posts);


module.exports = app;
