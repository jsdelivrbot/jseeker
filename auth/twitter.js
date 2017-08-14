var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
require('dotenv').config();
var User = require('../models/users');
var init = require('../auth/init');

passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK
}, function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({ githubId: profile.id } function(err, user) {
    if (err) {
      return done(err);
    } else {
      return done(null, user);
    }
  });

}));

init();

module.exports = passport;
