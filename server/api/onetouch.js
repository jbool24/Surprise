const ApiKey = process.env.AUTHY_API_KEY;
const authy = require('authy')(ApiKey);
const querystring = require('querystring');

// Extend the Authy module to send_approval_request
exports.send_approval_request = function(id, details, callback) {
    var url = "/onetouch/json/users/" + querystring.escape(id) + "/approval_requests";
    authy._request("post", "/onetouch/json/users/" + querystring.escape(id) + "/approval_requests", {
        "details[Email Address]": details.email,
        "message": details.message
    }, callback);
};
