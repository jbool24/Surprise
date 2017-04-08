const ok = require('./response_utils').ok;
const User = require('../models/User');
const error = require('./response_utils').error;
const Session = require('../models/Session');

// Create a new User
exports.create = function(request, response) {
    const p = request.body;
    const newUser = new User({
        fullName: p.fullName,
        email: p.email,
        phone: p.phone,
        countryCode: p.countryCode,
        password: p.password
    });

    newUser.save(function(err, doc) {
        if (err) {
            error(response, 500, 'Error saving new user - please try again.');
        } else {
            // Create a pre-authorized session token for the new user
            Session.createSessionForUser(doc, true, function(err, sessionDoc) {
                if (err) {
                    error(response, 500, 'Your user was created but we could '
                        + 'not log you in - please log in again.');
                } else {
                    response.send({
                        token: sessionDoc.token
                    });
                }
            });
        }
    });
};

// get info for currently logged in username
exports.getUser = function(request, response) {
    if (request.user) {
        const u = request.user;
        response.send({
            fullName: u.fullName,
            email: u.email,
            phone: u.phone
        });
    } else {
        error(response, 404,
            'No user found for session - please log in again.');
    }
};
