let mongoose = require.main.require('../config/db')

let schema = mongoose.Schema({
  name: String,
  month: { type: String, required: true },
  monthNum: { type: Number, required: true },
  desc: String,
  brewDate: Date,
  rackDate: Date,
  bottleDate: Date,
  fridgeDate: Date,
  releaseDate: Date,
  grains: [String],
  malts: [String],
  hops: [String],
  isVF: Boolean
}, {strict: true})

module.exports = mongoose.model('brews', schema)
