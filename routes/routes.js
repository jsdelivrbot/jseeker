var express = require('express');
var router = express.Router(),
    github = require('../auth/github'),
    User = require('../models/users');

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
  res.redirect('/login');
}

router.get('/protected', isLoggedIn, function(req, res) {
  res.render('protected', {
    user: req.user || '',
    page: 'protected'
  });
});

module.exports = router;
