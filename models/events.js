'use strict';
//use umodel export to
module.exports = function(sequelize, DataTypes) {
    //create events model
    var Events = sequelize.define("Events", {
        //this model needs: eventName, eventDate, eventOfferDuration, eventDescription
        eventName: {
            type: DataTypes.STRING,
            //allowNull: false,
            validate: {
                len: [
                    1, 250
                ],
                notNull: true
            }
        },

        eventDateTime: {
            type: DataTypes.DATE,
            allowNull: false
        },

        eventOfferDuration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: []
            }
        },

        eventDescription: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [
                    0, 1000
                ],
                notNull: true
            }
        }

    }, {
        classMethods: {
            associate: function(models) {
                Events.belongsToMany(models.Users, {through: 'UserEvents'});
            }
        }
    });

    //'return' the post after defining
    return Events;
};
