var express = require('express');
var router = express.Router();

/* GET events listing. */
router.get('/', function(req, res, next) {
  router.Events.findAll()
  .then(res.json('events'));
});

module.exports = router;

