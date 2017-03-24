var express = require('express');
var router = express.Router();

var exphbs = require("express-handlebars");
/* GET users listing. */

var eventList = require("../models/events.js");

router.get('/events', function(req, res, next) {
    db.Events.findAll({}).then((events) => {
        res.render('events', {events: events});
    });

});

module.exports = router;
