const Users = require('../../models').Users;
const Session = require('../../models').Session;
/*const uuid = require('node-uuid');*/

// Create a session for the given user
exports.createSessionForUser = function(user, conf, cb) {

    console.log('createSessionForUser called-------------------') // TODO
    console.log(`USER ID: ${user.id}-${conf}`)
    const newSession = Session.build({userId: user.id, confirmed: conf, token: uuid.v1()});
    console.log(newSession);

    // we need to do the 2FA step first
    if (!conf) {
        user.sendOneTouch((err, authyResponse) => {
            if (err)
                return cb.call(newSession, err);
            save(authyResponse);
        });
    } else {
        // if it's pre-confirmed just save the session
        save();
    }

    // Save the session object
    function save(authyResponse) {
        newSession.save().then(function(err, doc) {
            cb.call(newSession, err, doc, authyResponse);
        });
    }
};

// Get a user model for this session
exports.getUser = function(cb) {
    Users.findById(this.userId, cb);
};