const User = require('../models').User;
const Session = require('../models').Session;
const authConfig  = require('../config/auth');
const crypto = require('crypto');
const Qs = require('qs');

// Extract user model information for every request based on an auth token
exports.loadUser = function(req, res, next) {
    const token = req.get('X-API-TOKEN');
    if (!token) return next();

    // Find session by token, if it exists
    Session.findOne({ where: { token }}).then((err, doc) => {
        if (err || !doc) return next();

        // Store session model on request
        req.session = doc;

        User.findById(doc.userId, function(err, doc) {
            if (doc && !err) req.user = doc;
            return next();
        });
    });
};

// Authentication middleware
exports.loginRequired = function(req, res, next) {
    if (!req.session || !req.session.confirmed) {
        res.status(403).send({
            status: 403,
            message: 'Your session has expired - please log in again.'
        });
    } else {
        next();
    }
};

function sortObject(object){
    const sortedObj = {};
    const keys = Object.keys(object).sort();

    for(let index in keys){
        let key = keys[index];
        if(typeof object[key] == 'object' && !(object[key] instanceof Array) && object[key] != null){
            sortedObj[key] = sortObject(object[key]);
        } else {
            sortedObj[key] = object[key];
        }
    }
    return sortedObj;
}

// Authenticate Authy request
exports.validateSignature = function(req, res, next) {
    const key = authConfig.authyApiKey;
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;
    const params = Qs.stringify(sortObject(req.body));
    params = params.replace(/%20/g, "+");
    const nonce = req.get("X-Authy-Signature-Nonce");

    // format of Authy digest
    const message = nonce + "|" + request.method + "|" + url + "|" + params;

    const theirs = (request.get("X-Authy-Signature")).trim();
    const mine = crypto.createHmac('sha256', key).update(message).digest('base64');
    if (theirs != mine) {
        res.status(401).send({
            status: 401,
            message: "This request is unsigned."
        });
    } else {
        next();
    }
};
