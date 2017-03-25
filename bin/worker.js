const db = require('../models');
const request = require('request');

(function() {
    db.Events.findAll({}).then((events) => {
        const now = new Date();

        events.forEach((event) => {
            const eventStart = new Date(event.eventDateTime);
            const eventEnd = new Date(eventStart.getTime() + 30 * 60000);

            if (now >= eventStart) {

                const timeDelta = eventEnd - now;

                let minutesRemain = Math.round(((timeDelta % 86400000) % 3600000) / 60000);
                minutesRemain = minutesRemain < 0
                    ? 0
                    : minutesRemain;

                console.log(`Event@: ${eventStart}---Time Remaining: ${minutesRemain}`);
                if (minutesRemain > 0) {
                    console.log(`Time remains setting ${event.eventName} active`);
                    event.eventActive = true;
                } else {
                    console.log(`Time Up setting ${event.eventName} inactive`);
                    event.eventActive = false;
                }
                event.save();
            }

        });

    }).then(() => {
        request
        .get('http://surprise-app.herokuapp.com/message')
        .on('response', (res) => {
            console.log(res)
            console.log(res.statusCode)
        }).error((err) => console.log(err))
    });

})();
