'use strict';
module.exports = function(sequelize, DataTypes) {
  const Session = sequelize.define('Session', {
    userID: DataTypes.STRING,
    token: DataTypes.STRING,
    confirmed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Session;
};
