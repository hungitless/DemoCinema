var express = require('express');
require('express-session');
var router = express.Router();

router.get('/aaa', function(req, res, next) {
  if(req.session)
  {
    res.render('listView', { title: 'List Movie' });
  }
  else{
    res.render('signup', { title: 'Sign Up' });
  }
});
/* GET home page. */
router.get('/create', function(req, res, next) {
  res.render('createMovie', { title: 'Create Movie' });
});
router.get('/', function(req, res, next) {
  //var hungse = req.session
  res.render('listMovie', { title: 'Create Movie' });
});
router.get('/signup', function(req, res, next) {
  res.render('signUp', { title: 'Sign Up' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/', function(req, res, next) {
  var sessData = req.session;
  sessData.user = "";
  res.send('Returning with some text');
});




router.get('/test', function(req, res, next) {
  res.render('test', { title: 'Hung Test' });
});
module.exports = router;
