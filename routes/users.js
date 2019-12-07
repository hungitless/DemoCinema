const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
// router.get('/', (req, res) => res.render('login'));
// Welcome Page
router.get('/login', (req, res) => res.render('login'));
// Register Page 
router.get('/signup', (req, res) => res.render('signUp'));

// Register
// router.post('/signup', (req, res) => {
// });

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;