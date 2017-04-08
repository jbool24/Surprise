const signupPage = require('./signupPage');
const eventsPage = require('./eventsPage');
const loginPage = require('./loginPage');
const middleware = require('../api/middleware')

module.exports = function(app) {
    app.get('/events', middleware.loginRequired, eventsPage.page);

    app.get('/signup', signupPage.page);

    app.get('/login', loginPage.page);

    app.get('/addevent', function(req, res, next) {});
};
