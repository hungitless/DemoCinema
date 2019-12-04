var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/create', function(req, res, next) {
  res.render('createMovie', { title: 'Create Movie' });
});
router.get('/', function(req, res, next) {
  res.render('listMovie', { title: 'Create Movie' });
});
router.get('/signup', function(req, res, next) {
  res.render('signUp', { title: 'Sign Up' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});




router.get('/test', function(req, res, next) {
  res.render('test', { title: 'Hung Test' });
});
module.exports = router;
