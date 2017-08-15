const express = require('express');
const router = express.Router(),
    github = require('../auth/github'),
    User = require('../models/users');

const ctrlQA = require('../controllers/QA');
    ctrlQ = require('../controllers/Q'),
    //ctrlA = require('../controllers/A');

router.get('/', function(req, res) {
  res.render('index', {
        user: req.user || '',
        page: 'home'
      });
})

.get('/auth/github', github.authenticate('github'))
.get('/auth/github/callback', github.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/');
});

router.get('/login', function(req, res) {
  res.render('login', {
    user: req.user || '',
    page: 'login'
  });
});

router.get('/logout', isLoggedIn, function(req, res) {
  req.logout();
  res.redirect('/')
});

function isLoggedIn(req, res, next) {
  if (req.user) {
    return next();
  }
  console.log('redirect');
  res.redirect('/login');
}

router
  .get('/qa', ctrlQA.questionsRead) // categories then populate questions
  // --------------------------------------------------
  // Question Category (add/edit/delete for admin only)
  .get('/qc/add', isLoggedIn, ctrlQA.questionCategoryAdd)
  .post('/qc/add', isLoggedIn, ctrlQA.questionCategoryAdd)

  .post('/qc/edit_order', isLoggedIn, ctrlQA.questionCategoryOrderEdit)
  .get('/qc/edit/:id', isLoggedIn, ctrlQA.questionCategoryEdit)
  .put('/qc/edit', isLoggedIn, ctrlQA.questionCategoryEdit)

  .delete('/qc/delete', isLoggedIn, ctrlQA.questionCategoryDelete)

  // ----------------------------------------
  // Question (add/edit/delete for admin only)
  .get('/q/read/:id', ctrlQ.questionsRead)
  //
  .get('/q/add/:cat_id', isLoggedIn, ctrlQ.questionAdd)
  .post('/q/add/:cat_id', isLoggedIn, ctrlQ.questionAdd)
  //
  .get('/q/edit/:id/:cat_id', isLoggedIn, ctrlQ.questionEdit)
  .put('/q/edit', isLoggedIn, ctrlQ.questionEdit)

  .delete('/q/delete', isLoggedIn, ctrlQ.questionDelete)

  // Answers
  // .get('/a/:id', isLoggedIn, ctrlA.answerRead)
  // .post('/a', isLoggedIn, ctrlA.answerAdd)
  // .put('/a/:id', isLoggedIn, ctrlA.answerEdit)
  // .delete('/a/:id', isLoggedIn, ctrlA.answerDelete)

module.exports = router;
