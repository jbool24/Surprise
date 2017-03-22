var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  router.Events.findAll()
  .then(res.json('Events'));
});

module.exports = router;

