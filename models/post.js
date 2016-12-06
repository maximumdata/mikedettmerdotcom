let mongoose = require.main.require('../config/db')

let schema = mongoose.Schema({
  id: { type: Number, required: true },
  title: String,
  slug: {type: String, unique: true, index: true},
  content: String,
  desc: String,
  created: { type: Date, default: Date.now },
  createdStr: String,
  categories: [String],
  tags: [String],
  hidden: { type: Boolean, default: false }
}, {strict: true})

module.exports = mongoose.model('post', schema)
