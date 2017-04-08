const db = require('../models');
const Session = require('./sessions');

exports.login = function(req, res) {
    const email = req.body.email;
    const candidatePassword = req.body.password;

    db.Users.findOne({where: { email }}).then((user) => {

        valid(user);

        // TODO check for invalid user;
        function invalid() {
            res.status(403).send({message: 'Invalid username/password.'});
        }

        function valid(user) {
            db.Session.createSessionForUser(user, true, (err, sessionInstance) => {
                if (err) {
                    console.log(err) // TODO
                    res.status(500).send({message: 'Your user was created but we could not log you in - please log in again.'});
                } else {
                    req.session.token = sessionInstance.token;
                    res.redirect('/events');
                }
            });
        }

    }).catch((err) => {
        if (err)
            res.status(403).send({err: err, message: 'Invalid username/password.'});
    });
};

exports.logout = function(req, res) {
    db.Session.findAll({
        where: {
            id: req.params.user
        },
        limit: 1
    }).then((session) => {
        session.destroy();
        res.send(200).end();
    }).catch((err) => {
        res.status(500).send({message: err});
    });
};
