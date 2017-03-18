const uuid = require('node-uuid');

module.exports = function(sequelize, DataTypes) {
    const Session = sequelize.define('Session', {
        userID: {
            type: DataTypes.STRING,
            required: true
        },
        token: {
            type: DataTypes.STRING,
            required: true
        },
        confirmed: {
            type: DataTypes.BOOLEAN,
            default: false

        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            },
            createSessionForUser,
        },
        instanceMethods: {
            getUser,
        },
    });
    return Session;
};

function createSessionForUser(user, conf, cb) {
    console.log('createSessionForUser called-------------------') // TODO
    const newSession = Session.build({userId: user.id, confirmed: conf, token: uuid.v1()}).then((session) => {
        // we need to do the 2FA step first
        if (!conf) {
            user.sendOneTouch((err, authyResponse) => {
                if (err)
                    return cb.call(session, err);
                save(authyResponse);
            });
        } else {
            // if it's pre-confirmed just save the session
            save();
        }
    }).catch((err) => console.log(err));

    // Save the session object
    function save(authyResponse) {
        newSession.save().then(function(err, doc) {
            cb.call(newSession, err, doc, authyResponse);
        });
    }
};

// Get a user model for this session
function getUser(cb) {
    User.findById(this.userId, cb);
};
