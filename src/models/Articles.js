const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
  body: { type: String },
  author: { type: String },
  img: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Article', articleSchema);
