const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

let BlogSchema = new Schema({
  time: { type: Date, default: Date.now },
  content: { type: String, required: true },
  title: { type: String, required: true },
  categories: { type: Array },
  tags: { type: Array }
});

module.exports = mongoose.model('blogPost', BlogSchema);
