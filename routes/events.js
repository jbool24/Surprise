var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  events.findAll().then(res.json('events'));
});

module.exports = router;
