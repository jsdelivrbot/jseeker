const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Answers = new Schema({
  user: {
  	id: {
  		type: Schema.Types.ObjectId,
	  	ref: 'Github_seeker_users'
  	}
  },
  question: {
  	id: {
  		type: Schema.Types.ObjectId,
	  	ref: 'Questions'
  	}
  },
  question_category: {
    id: {
      type: Schema.Types.ObjectId,
	  	ref: 'Question_categories'
    }
  },
  answer: String,
  mark: String
});

module.exports = mongoose.model('Answers', Answers);
