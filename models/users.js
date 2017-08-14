var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  github_id: String,
  name: String,
  avatar: String
});

module.exports = mongoose.model('Github_seeker_users', User);
