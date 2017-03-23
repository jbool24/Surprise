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
            createSessionForUser
        }
    });

    // Create a session for the given user
    function createSessionForUser(user, pre_confirmed, cb) {
        const newSession = {
            userId: user.id,
            confirmed: pre_confirmed,
            token: uuid.v1()
        };

        // Save the session object
        Session.create(newSession).then((sessionInstance) => cb(null, sessionInstance));

    };

    return Session;
};
