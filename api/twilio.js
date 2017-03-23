const twilio = require('twilio');
const auth = require('../config/auth');
const db =  require('../models');
const Users = db.Users;
const Events = db.Events;

const accountSid = auth.prod.sid;
const authToken = auth.prod.token;
const appPhone = auth.prod.phone;

const twilioClient = require('twilio')(accountSid, authToken);


function messageSubscribers(sendToNumber, eventMsg) {
    twilioClient.messages.create({
        to: sendToNumber,
        from: appPhone, // Valid twilio assigned number
        body: eventMsg // event description,
    }, (err, message) => {
      if (err) return console.log(err.message);

        console.log(`From Twilio---- ${message.sid}`);
    });
}

exports.sendSMS = function(req, res) {
    Users.findAll({
      include: [{
        model: Events,
        where: {
          eventActive: true
        }
      }]
    }).then((users) => {
         users.forEach((user) => {

           const validNumber = user.countryCode + user.phone;

           user.Events.forEach((event) => {
              messageSubscribers(validNumber, event.eventDescription)
           });
          res.json({users: users});
    }).catch((err) => console.log(err));
  }).catch((err) => console.log(err));
};


const admins = auth.admins;
exports.notifyOnError = function(appError, req, res, next) {
    admins.forEach((admin) => {
      const messageToSend = formatMessage(appError.message);
      twilioClient.sendSms(admin.phone, messageToSend);
    });
    next(appError);
  };


function formatMessage(errorToReport) {
  return '[This is a test] ALERT! It appears the server is' +
    'having issues. Exception: ' + errorToReport +
    '. Go to: http://newrelic.com ' +
    'for more details.';
};