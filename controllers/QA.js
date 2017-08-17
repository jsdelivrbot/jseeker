const mongoose = require('mongoose');
const Question_category = require('../models/question_categories');
const Question = require('../models/questions');
const marked = require('marked');
marked.setOptions({
  sanitize: true
});
require('dotenv').config();
module.exports.questionsRead = function(req, res) {
	if (req.user) {
		var r = req.user.name == process.env.ADMIN_NAME ? true : false;
	}
	Question_category.find({})
		.populate({
			path: 'question_categories',
			populate: {
				path: 'questions'
			}
		})
		.exec(function(err, qc_list) {
			if (err) {
				res.status(400).json({message: 'Error'})
			} else {
				// order list by 'order' number
				qc_list.sort(function(a, b) {
					if (a.order < b.order) {
						return -1;
					} else if (a.order > b.order ) {
						return 1;
					}
					return 0;
				});

				res.render('my_questions', {
					marked: marked,
					user: req.user || '',
					page: 'my_questions',
					qcategories: qc_list,
					admin: r || false,
				})
			}
		});
};

module.exports.questionCategoryAdd = function(req, res) {
	// only admin
	if (req.user.name !== process.env.ADMIN_NAME) {
		res.redirect('/?message=admin only');
	} else {
		if (req.method === 'GET') {
			res.render('qcategory_add', {
				user: req.user,
				page: 'qcategory_add'
			});
		} else if (req.method === 'POST') {
			// add question category
			var category = new Question_category({
				category: req.body.category
			});
			category.save();
			res.redirect('/qa?message=added new category');
		}
	}
};

module.exports.questionCategoryEdit = function(req, res) {
	// only admin
	if (req.user.name !== process.env.ADMIN_NAME) {
		res.redirect('/?message=admin only');
	} else {
		if (req.method === 'GET') {
			Question_category.findById(req.params.id)
			.populate('questions')
			.exec(function(err, qc) {
				if (err) {
					throw err;
				} else {
					res.render('qcategory_edit', {
						user: req.user,
						page: 'qcategory',
						qc: qc
					})
				}
			});
		} else if (req.method === 'PUT') {
			Question_category.findById(req.body.id, function(err, qc) {
				if (err) { throw err; } else {
					qc.category = req.body.category;
					qc.save();
					console.log('question updated')
					res.redirect('/qa');
				}
			});
		}
	}
};

module.exports.questionCategoryDelete = function(req, res) {
	// only admin
	if (req.user.name !== process.env.ADMIN_NAME) {
		res.redirect('/?message=admin only');
	} else {
		console.log(req.body.id);
		Question_category.findOneAndRemove({ _id: req.body.id }, function(err) {
			if (err) { throw err } else {
				res.status(200).json({message:'question category deleted'});
			}
		});
	}
};

module.exports.questionCategoryOrderEdit = function(req, res) {
	// only admin
	if (req.user.name !== process.env.ADMIN_NAME) {
		res.redirect('/?message=admin only');
	} else {
		Question_category.findOneAndUpdate({ _id: req.body.id }, {
			order: req.body.order
		}, function(err, qc) {
			if (err) { throw err }
			else {
				console.log(qc);
				res.status(200).json(qc);
			}
		});
	}
};
