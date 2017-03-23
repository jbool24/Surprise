const Session = require('../models').Session;
const Users = require('../models').Users;

exports.create = function(req, res) {
    console.log(req.body);
    const email = req.body.email;
    const candidatePassword = req.body.password;

    Users.findOne({where: {
            email
        }}).then((user) => {
        user.comparePassword(candidatePassword, (err, match) => {
            if (err || !match)
                return invalid();
            return valid(user);
        });
    }).catch((err) => {
        if (err || !user)
            return invalid();
        }
    );

    function invalid() {
        res.status(403).send({message: 'Invalid username/password.'});
    }

    function valid(user) {
        Session.createSessionForUser(user, false, (err, session, authyResponse) => {
            if (err || !session) {
                res.status(500).send({message: err});
            } else {
                res.send({token: session.token, authyResponse: authyResponse});
            }
        });
    }
};

// Destroy the given session (log out)
exports.destroy = function(req, res) {
    req.session && req.session.destroy().then((err, doc) => {
        if (err) {
            res.status(500).send({message: err});
        } else {
            res.redirect("/login");
        }
    });
};
