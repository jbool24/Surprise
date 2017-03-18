const querystring  = require('querystring');
const authConfig = require('../config/auth');
// Create authenticated Authy API client
const authy = require('authy')(authConfig.authyApiKey);

// Extend the Authy module to send_approval_request
exports.send_approval_request = function(id, details, callback) {
    const url = "/onetouch/json/users/" + querystring.escape(id) + "/approval_requests";
    authy._request("post", "/onetouch/json/users/" + querystring.escape(id) + "/approval_requests", {
        "details[Email Address]": details.email,
        "message": details.message
    }, callback);
};
