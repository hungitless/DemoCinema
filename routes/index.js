var express = require('express');
var router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/create', function(req, res, next) {
  res.render('createMovie', { title: 'Create Movie' });
});

router.get('/', function(req, res, next) {
  res.render('listMovie', { title: 'List Movie' });
});

router.get('/movie', function(req, res, next) {
  res.render('detailMovie', { title: 'Detail Movie' });
});

router.get('/movie/:id', function(req, res, next) {
  res.render('detailMovie', { 
    title: 'Detail Movie',
    id: req.params.id
  });
});

router.get('/movie/edit/:id', function(req, res, next) {
  res.render('editMovie', { 
    title: 'Edit Movie',
    id: req.params.id
  });
});

router
module.exports = router;
