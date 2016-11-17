let mongoose = require.main.require('../config/db')

let schema = mongoose.Schema({
  title: String,
  content: String,
  created: { type: Date, default: Date.now },
  categories: [String],
  tags: [String],
  hidden: { type: Boolean, default: false }
})

module.exports = mongoose.model('post', schema)
