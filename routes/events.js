var express = require('express');
var router = express.Router();

/* GET users listing. */


var eventList = require("./models/events.js");

router.get('/events', function(req, res, next) {
	consoloe.log(events)
  db.Events.findAll({}).then(function)(dbEvents){
  	res.render('events',{events:events});
  });
 
 });


module.exports = router;

