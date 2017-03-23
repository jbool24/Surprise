const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const indexRoutes = require('./routes');
console.log(indexRoutes)
const usersRoute = require('./routes/users.js');
const createRoute = require('./routes/create.js');
const app = express();
var exphbs = require("express-handlebars");


// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');*/

app.engine("handlebars", exphbs({ defaultLayout: "layout" }));
app.set("view engine", "hbs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( indexRoutes);
app.get('/users', usersRoute);
app.use('/create', createRoute);

// REST API for Authentication
require('./api')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
