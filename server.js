const express = require('express');
const passport = require('passport');
var session = require('express-session');
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();
app.use(session({secret: "chelsea FC es numero uno"}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: '2228266810732596',
    clientSecret: '2ba83b4a064e337c44463a64e2bf1cd6',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(token, refreshToken, profile, done) {
      return done(null, profile);

  }));

  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/me',
    failureRedirect: '/auth/facebook'
  }), function (req, res) {
      console.log(req.session);
  });

  passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/me', function(req, res) {
res.send(req.user);
})


app.listen(3000, function(){
  console.log('I hear you sir')
});
