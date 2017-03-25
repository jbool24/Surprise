const db = require('../models');

exports.create = function(req, res) {
  const time = req.body.time;
    db.Events.create({
      eventName: req.body.eventName,
      eventDateTime: req.body.date + " " + time,
      eventOfferDuration: req.body.duration,
      eventDescription: req.body.description
    }).then(() => res.redirect("/events")).catch((err) => console.log(err));
};


exports.getAll = function(req, res) {
  db.Events.findAll({}).then((events) => {
    res.json({ events });
  }).catch(err => console.log(err));
}
