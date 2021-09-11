const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//allows user to register on website
router.post('/signup', (req, res) => {
  User.register(
    new User({username: req.body.username}),
    req.body.password,
    err => {
      //if something went interally wrong when trying to register
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
      } else {
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'applicaion/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      }
    }
  );
});

//posts request with username and password
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, status: 'You are successfully logged in!'})
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    //clears cookie that is stored on client server
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    //client requesting to logout without logging in
    const err = new Error('You are not logged in!');
    err.status = 401;
    return next(err);
  }
});

module.exports = router;
