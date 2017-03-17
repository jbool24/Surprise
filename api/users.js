const User = require('../models').User;
const Session = require('../models').Session;


// Create a new User
exports.create = function(req, res) {
    const p = req.body;
    const newUser = User.create({
        username: p.username,
        email: p.email,
        phone: p.phone,
        countryCode: p.countryCode,
        password: p.password
    });

    newUser.save(function(err, doc) {
        if (err) {
            res.status(500).send({message:'Error saving new user - please try again.'});
        } else {
            // Create a pre-authorized session token for the new user
            Session.createSessionForUser(doc, true, function(err, sessionDoc) {
                if (err) {
                    res.status(500).send({message:'Your user was created but we could not log you in - please log in again.'});
                } else {
                    res.send({
                        token: sessionDoc.token
                    });
                }
            });
        }
    });
};

// get info for currently logged in username
exports.getUser = function(req, res) {
    if (req.user) {
        const u = request.user;
        res.send({
            username: u.username,
            email: u.email,
            phone: u.phone
        });
    } else {
        resp.status(404).send({message:'No user found for session - please log in again.'});
    }
};
