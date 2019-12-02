var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('createMovie', { title: 'Create Movie' });
});

module.exports = router;
