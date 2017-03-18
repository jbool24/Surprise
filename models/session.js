const hooks = require('./hooks/session-hooks');

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
            createSessionForUser: hooks.createSessionForUser,
        },
        instanceMethods: {
            getUser: hooks.getUser,
        },
    });
    return Session;
};
