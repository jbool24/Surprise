'use strict';
//use model export to
module.exports = function(sequelize, DataTypes) {
    //create User model
    var Users = sequelize.define("Users", {
        //this model needs: userName, email, countyCode, authyId, phone, password
        userName: {
            type: DataTypes.STRING,
            //allowNull: false,
            validate: {
                len: [
                    1, 150
                ],
                notNull: true
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
            type: DataTypes.INTEGER,
            allowNull: false

        },

        phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [0, 11]
            }
        },

        authyId: {
            type: DataTypes.STRING,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [
                    8, 16
                ],
                notNull: true
            }
        }

    }, {
        classMethods: {
          associate: function(models) {
            Users.belongsToMany(models.Events, {through: 'UserEvents'});
          },
        }
    });

    //'return' the post after defining
    return Users;
};
