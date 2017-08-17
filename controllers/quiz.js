const mongoose = require('mongoose');
const User = require('../models/users');
const Question_category = require('../models/question_categories');
const Question = require('../models/questions');
const Answer = require('../models/answers');
const marked = require('marked');
marked.setOptions({
  sanitize: true
});
require('dotenv').config();

// to generate random numbers
function randomInt(min, max) {
  return Math.round(min + Math.random()*(max-min));
}

function returnRandomArray(min, max, length) {
  var index = {}, numbers = [];
  for (var i=0; i<length; ++i) {
      var number;
      do {
          number = randomInt(min, max);
      } while (index.hasOwnProperty("_"+number));
      index["_"+number] = true;
      numbers.push(number);
  }
  delete index;
  return numbers;
}

module.exports.all = (req, res) => {
  const count = req.params.count;
  Question.find({}, (err, questions) => {
    // generate random numbers array based on length and count
    var random = returnRandomArray(1, questions.length, req.params.count);
    // console.log(random);
    var quiz_items = random.map(function(item) {
      return questions[item-1];
    });
    res.render('quiz_all', {
      user: req.user || '',
      page: 'quiz_all',
      quiz_items: quiz_items,
      marked: marked
    });
  });
};

module.exports.category = (req, res) => {
  const count = req.params.count,
        cat_id = req.params.cat_id;

  Question_category.findById(cat_id)
    .populate('questions')
    .exec((err, qc) => {
    // generate random numbers array based on length and count
    var random = returnRandomArray(1, qc.questions.length, req.params.count);
    var quiz_items = random.map(function(item) {
      return qc.questions[item-1];
    });
    res.render('quiz_cat', {
      user: req.user || '',
      page: 'quiz_all',
      quiz_items: quiz_items,
      marked: marked,
      qc: qc
    });
  });
};

module.exports.saveAnswer = (req, res) => {
  const q_id = req.params.q_id;
  // find if answer already exist

  Question_category
    .find({})
    .populate({
      path: 'questions',
      match: { _id: q_id }
    })
    .exec(function(err, qc) {
      if (err) { throw err }
      var cat_id;
      qc.forEach(function(q_cat) {
        if (q_cat.questions) {
          // console.log(q_cat);
          // cat_id = q_cat.questions[0]._id;
        }
      });
      User.findById(req.user._id, function(err, user) {
        if (err) { throw err }
        Answer.findOne({
          'user': {
            'id': req.user._id
          },
          'question': {
            'id': q_id
          }
        }, function(err, a) {
          if (a) {
            a.answer = req.body.answer;
            a.mark = req.body.mark;
            a.save();
            user.answers.push(a);
            user.save();
            res.status(200).json(a);
          } else {
            var a = new Answer({
              user: {
                id: user
              },
              question: {
                id: q_id
              },
              question_category: {
                id: cat_id
              },
              answer: req.body.answer
            })
            a.save();
            user.answers.push(a);
            user.save();
            res.status(200).json(a);
          }
        });
      });
    });
};
