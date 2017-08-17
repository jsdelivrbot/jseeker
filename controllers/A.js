const mongoose = require('mongoose');
const User = require('../models/users');
const Question = require('../models/questions');
const Answer = require('../models/answers');
const marked = require('marked');
marked.setOptions({
  sanitize: true
});
require('dotenv').config();

module.exports.answerAdd = function(req, res) {
	if (req.method === 'GET') {
		console.log('get');
		Question.findById(req.params.q_id, function(err, q) {
			if (err) { throw err }
			else {
				res.render('a_add', {
					user: req.user,
					page: 'a_add',
					q: q,
					cat_id: req.params.cat_id
				});
			}
		});
	} else if (req.method === 'POST') {
		Question.findById(req.body.q_id, function(error, q) {
			if (error) { throw error }
			else {
				User.findById(req.user._id, function(err, user) {
					var a = new Answer({
						user: {
							id: user
						},
						question: {
							id: q
						},
						question_category: {
							id: req.body.cat_id
						},
						answer: req.body.answer,
						mark: req.body.mark
					})
					a.save();
					user.answers.push(a);
					user.save();
					res.redirect('/q/read/' + req.body.cat_id);
				});
			}
		});
	}
};
//
module.exports.answerEdit = function(req, res) {
	if (req.method === 'GET') {
		Answer.findById(req.params.a_id)
			.populate('question.id')
			.exec(function(err, a) {
				if (err) {
					throw err;
				} else {
					console.log(a);
					res.render('a_edit', {
						user: req.user,
						page: 'a_edit',
						a: a
					})
				}
			});
	} else if (req.method === 'PUT') {
		Answer.findById(req.body.a_id, function(err, a) {
			if (err) { throw err; }
			// check if user is authorized to edit this answer
			else if (req.user._id.toString() === a.user.id.toString()) {
				a.answer = req.body.answer;
				a.mark = req.body.mark;
				a.save();
				console.log('question updated')
				res.redirect('/q/read/' + req.body.cat_id);
			} else {
				res.status(400).json({message:'not authorized to delete'});
			}
		});
	}
};
//
module.exports.answerDelete = function(req, res) {
		// delete answer
		Answer.findById(req.body.a_id, function(err, answer) {
			if (err) { throw err } else {
				if (req.user._id.toString() == answer.user.id.toString()) {
					answer.remove();
					// delete answer from user array of answers
					User.findById(req.user._id, function(err, user) {
						if (err) { throw err } else {
						user.answers.pull(req.body.a_id);
						user.save();
						}
					});
					res.status(200).json({message:'question deleted'});
				}
			}
		});
};
