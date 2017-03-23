var express = require('express');
var router = express.Router();
var exphbs = require("express-handlebars");

var login = require("../models/session.js");

/* GET home page. whihc is the login page */
router.get('/', function(req, res, next) {
  res.render('index', {body});
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

module.exports = router;
