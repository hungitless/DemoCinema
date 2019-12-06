var express = require('express');
var router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
// router.get('/', forwardAuthenticated, (req, res) => res.render('listMovie'));

// Dashboard
// router.get('/', ensureAuthenticated, (req, res) =>
//   res.render('listMovie', {
//     user: req.user.name
//   })
//   // console.log(req.user)
// );



// router.get('/aaa', function(req, res, next) {
//   if(req.session)
//   {
//     res.render('listView', { title: 'List Movie' });
//   }
//   else{
//     res.render('signup', { title: 'Sign Up' });
//   }
// });
/* GET home page. */

// 

router.get('/create', function(req, res, next) {
  res.render('createMovie', { title: 'Create Movie' });
});
router.get('/', function(req, res, next) {
  res.render('listMovie', { title: 'List Movie' });
});

// router.get('/signup', function(req, res, next) {
//   res.render('signUp', { title: 'Sign Up' });
// });
// router.get('/login', function(req, res, next) {
//   res.render('login', { title: 'Login' });
// });
module.exports = router;
