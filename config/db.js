const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mikedettmerdotcom');

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('connected to database ok!');
});

module.exports = db;
