var express = require('express');
var router = express.Router();
var exphbs = require("express-handlebars");
/* GET create page. */

var creation = require("../models/users.js");


router.get('/create', function (req, res, next) {
  res.render('create');
});

function validNewuser(user){
	return typeof user.userName =="string" &&
		user.userName.trim() != '' &&
		typeof user.email == "string" &&
		/*typofuser.countryCode == "string" &&*/
		typeof user.phone == "string" &&
		typeof user.password == "string"

} 
router.post('/', function (req,res,next){
	if(validNewuser (req.body)){
		var user = {
			name: req.body.userName,
			email: req.body.email,
			phone: req.body.phone,
			password: req.body.password
		}.then (function(update){
		 db.Users.update({
			text:req.body.text})
		});
	

	}
	else{
		/*send error message*/

	}
})
module.exports = router;