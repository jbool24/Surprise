const bcrypt        = require('bcrypt');
const authConfig    = require('../config/auth');

const SALT_WORK_FACTOR = 10;

'use strict';
//use model export to
module.exports = function(sequelize, DataTypes) {
    //create User model
    var Users = sequelize.define("Users", {
        //this model needs: userName, email, phone, password, countyCode, authyId, authyStatus
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 150]
            }
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },

        countryCode: {
            type: DataTypes.STRING,
            allowNull: false
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [0, 11]
            }
        },

        authyId: {
            type: DataTypes.STRING
        },

        authyStatus: {
            type: DataTypes.STRING
        },

        isBiz: {
          type: DataTypes.BOOLEAN,
          default: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 16]
            }
        }
    }, {
        classMethods: {
            associate: function(models) {
                Users.belongsToMany(models.Events, {through: 'UserEvents'});
            },
        }
    });

    Users.hook('beforeCreate', function(user, {}, next) {
        console.log("hook has been called")
        let self = user;
        // only hash the password if it has been modified (or is new)
        if (!self.changed('password'))
            return next();

        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            if (err)
                return next(err);

            // hash the password using our new salt
            bcrypt.hash(self.password, salt, (err, hash) => {
                if (err)
                    return next(err);

                // override the cleartext password with the hashed one
                self.password = hash;
                next();
            });
        });

    });
    //'return' the post after defining
    return Users;
};
