const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Question_categories = new Schema({
  order: Number,
  category: String,
  questions: [{
  	type: Schema.Types.ObjectId,
  	ref: 'Questions'
  }]
});

module.exports = mongoose.model('Question_categories', Question_categories);
