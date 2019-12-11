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

// Register Page 
router.get('/profile', (req, res) => res.render('profileUser'));

// Change Pass
router.get('/changePass', (req, res) => res.render('changePass'));

// Edit Info User
router.get('/edituser', (req, res) => res.render('editUser'));


// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;