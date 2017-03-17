const Session = require('../models').Session;
const User    = require('../models').User;

// Create a session for the given user
Session.prototype.createSessionForUser = function(user, conf, cb) {
    const newSession = new Session({
        userId: user.id,
        confirmed: conf,
        token: uuid.v1()
    });
    // we need to do the 2FA step first
    if (!conf) {
        user.sendOneTouch(function(err, authyResponse) {
            if (err) return cb.call(newSession, err);
            save(authyResponse);
        });
    } else {
        // if it's pre-confirmed just save the session
        save();
    }

    // Save the session object
    function save(authyResponse) {
        newSession.save(function(err, doc) {
            cb.call(newSession, err, doc, authyResponse);
        });
    }
};

// Get a user model for this session
Session.prototype.getUser = function(cb) {
    User.findById(this.userId, cb);
};
