var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require("express-handlebars");
var session = require('express-session');

require('dotenv').config()


var sess = {
  secret: 'keyboard cat',
  cookie: {}
};

var app = express();
var port = 3000;
// view engine setup
app.engine("handlebars", exphbs({ defaultLayout: "layout" }));
app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, 'views'));

app.use(session(sess));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => { 
    res.render('index');

});

app.get('/signup', function (req, res, next) {
  res.render('signup');
});


app.get('/addevent', function (req,res,next){
  res.render('addevent');
});


var db = require("./models");
app.get('/events', function(req, res, next) {
  console.log("Called events")

      res.render('events');
});

// REST API for Authentication
require('./api')(app);
app.listen(port, function() {
    console.log('APP IS LISTENING ON PORT ' + port)
})

// catch 404 and forward to error handlerapp.use(function(req, res, next) {    var err = new Error('Not Found');


// error handler
/*app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'
        ? err
        : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error', { err });
});*/

