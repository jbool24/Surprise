var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('events_list', { title:'Events List' });
});

module.exports = router;
