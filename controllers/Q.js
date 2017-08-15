const mongoose = require('mongoose');
const Question_category = require('../models/question_categories');
const Question = require('../models/questions');
const marked = require('marked');
require('dotenv').config();

module.exports.questionsRead = function(req, res) {
	if (req.user) {
		var r = req.user.name == process.env.ADMIN_NAME ? true : false;
	}
	Question_category.findById(req.params.id)
		.populate('questions')
		.exec(function(err, q_category) {
			if (err) {
				res.status(400).json({message: 'Error'})
			} else {
				res.render('q_read', {
					marked: marked,
					user: req.user || '',
					page: 'questions',
					q_category: q_category,
					admin: r || false,
				})
			}
		});
};

module.exports.questionAdd = function(req, res) {
	// only admin
	if (req.user.name !== process.env.ADMIN_NAME) {
		res.redirect('/?message=admin only');
	} else {
		if (req.method === 'GET') {
			res.render('q_add', {
				user: req.user,
				page: 'q_add',
				cat_id: req.params.cat_id
			});
		} else if (req.method === 'POST') {
			// add question category
			console.log(req.params.cat_id);
			Question_category.findById(req.params.cat_id, function(err, qc) {
				if (err) { throw err; }
				else {
					var question = new Question({
						question: req.body.question,
						answer_link: req.body.answer_link || ''
					});
					question.save();
					qc.questions.push(question);
					qc.save();
					res.redirect('/q/read/' + req.params.cat_id + '?message=added new question');
				}
			});
		}
	}
};

module.exports.questionEdit = function(req, res) {
	// only admin
	if (req.user.name !== process.env.ADMIN_NAME) {
		res.redirect('/?message=admin only');
	} else {
		if (req.method === 'GET') {
			Question.findById(req.params.id, function(err, q) {
				if (err) {
					throw err;
				} else {
					res.render('q_edit', {
						user: req.user,
						page: 'qcategory',
						cat_id: req.params.cat_id,
						q: q
					})
				}
			});
		} else if (req.method === 'PUT') {
			Question.findById(req.body.id, function(err, q) {
				if (err) { throw err; } else {
					q.question = req.body.question;
					q.answer_link = req.body.answer_link;
					q.save();
					console.log('question updated')
					res.redirect('/q/read/' + req.body.cat_id);
				}
			});
		}
	}
};

module.exports.questionDelete = function(req, res) {
	// only admin
	if (req.user.name !== process.env.ADMIN_NAME) {
		res.redirect('/?message=admin only');
	} else {
		Question_category.findById(req.body.cat_id, function(err, qc) {
			qc.questions.pull(req.body.id);
			qc.save();
		});
		Question.findOneAndRemove({ _id: req.body.id }, function(err) {
			if (err) { throw err } else {
				res.status(200).json({message:'question deleted'});
			}
		});
	}
};
