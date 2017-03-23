var express = require('express');
var router = express.Router();
var exphbs = require("express-handlebars");
/* GET users listing. */


var eventList = require("../models/events.js");

router.get('/:events', function(req, res, next) {
  router.Events.findAll()
  .then(res.render('Events',{#each events}));
});

module.exports = router;

