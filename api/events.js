const db = require('../models');

exports.create = function(req, res) {
    db.Events.create({
      eventName: req.body.eventName,
      eventDateTime: req.body.dateTime,
      eventOfferDuration: req.body.duration,
      eventDescription: req.body.description,
    }).catch((err) => console.log(err));
};
