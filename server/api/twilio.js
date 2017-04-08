const twilio = require('twilio');
const Users =  require('../models/User');
const Events =  require('../models/Event');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const appPhone = process.env.TWILIO_SMS;

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
    User.find({
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
