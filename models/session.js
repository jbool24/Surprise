const uuid = require('node-uuid');

'use strict';
module.exports = function(sequelize, DataTypes) {
    const Session = sequelize.define('Session', {
        userId: {
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


    // Create a session for the given user
    function createSessionForUser(user, conf, cb) {
        console.log('Inside createSessionForUser-------------------') // TODO
        console.log(`USER ID: ${user.id}-${conf}--${user.password}`)
        const newSession = {
          userId: user.id,
          confirmed: conf,
          token: uuid.v1()
        };
        
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
          console.log(this);
            Session.create(newSession).then(function(sessionInstance) {
                cb(null,sessionInstance);
            });
        }
    };

    // Get a user model for this session
    function getUser(cb) {
        // Users.findById(this.userId, cb);
    };

    return Session;
};
