'use strict';
//use umodel export to 
module.exports = function(sequelize, DataType){
	//create User model
	var Users = sequelize.define("Users", {
		//this model needs: eventName, eventDate, eventOfferDuration, eventDescription
		eventName: {
			type: DataType.STRING,
			//allowNull: false,
			validate:{
				len: [1, 250],
				notNull: true
			}
		},

		eventDateTime: {
			type: DataType.DATETIME,
			allowNull: false,
		},

		eventOfferDuration: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate:{
				len: [],
			}
		},

		eventDescription: {
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				len: [0, 1000],
				notNull: true
			}
		}

	});

	//'return' the post after defining
 return Users;
};