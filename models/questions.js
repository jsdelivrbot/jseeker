const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Question = new Schema({
  question: String,
  answer_link: String
});

module.exports = mongoose.model('Questions', Question);
