const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  github_id: String,
  name: String,
  avatar: String,
  answers: [{
  	type: Schema.Types.ObjectId,
  	ref: 'Answers'
  }],
  applications: [{
  	type: Schema.Types.ObjectId,
  	ref: 'Applications'
  }]
});

module.exports = mongoose.model('Github_seeker_users', User);
