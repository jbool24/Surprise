const users = require('./users');
const events = require('./events');
const sessions = require('./sessions');
const middleware = require('./middleware');
const bodyParser = require('body-parser');
const twilio = require('./twilio');

// Mount API routes on the Express web app
module.exports = function(app) {

    // Look for session information before API requests
    app.use(middleware.loadUser);

    // Create a new user
    app.post('/user', users.create);

    // Get information about the currently logged in user
    app.get('/user', middleware.loginRequired, users.getUser);

    // Create a new session -- Login
    app.post('/session', sessions.create);

    // Log out (destroy a session)
    app.delete('/session', middleware.loginRequired, sessions.destroy);

    // Check the OneTouch status on the user
    app.get('/authy/status', sessions.authyStatus);

    // The webhook that Authy will call on a OneTouch event
    app.post('/authy/callback', bodyParser.json(), middleware.validateSignature, sessions.authyCallback);

    // Validate the given session with an Authy 2FA token
    app.post('/session/verify', sessions.verify);

    // resend an authorization token
    app.post('/session/resend', sessions.resend);

    // Create Event
    app.post('/events', events.create);

    // Get Events
    app.get('/events/all', events.getAll);

    // routes message to users
    app.get('/message', twilio.sendSMS);

};
