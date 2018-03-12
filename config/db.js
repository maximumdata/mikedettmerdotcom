const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mikedettmerdotcom', { useMongoClient: true })
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('db connected')
})

module.exports = mongoose
