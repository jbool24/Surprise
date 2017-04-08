// Dependencies
// =============================================================
const path          = require('path');
const http          = require('http');
const logger        = require('morgan');
const express       = require('express');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const favicon       = require('serve-favicon');
const session       = require('express-session');
const cookieParser  = require('cookie-parser');
const debug         = require('debug')('surprise:server');

// development env variables
require('dotenv').config();

const env = process.env.NODE_ENV;
(env === 'development')
    ? mongoose.connect(process.env.MONGO_URL)
    : mongoose.connect(process.env.MONGOLAB_URI)

const sess = {
  secret: process.env.SECRET,
  cookie: {}
};

const app = express();
const PORT = process.env.PORT || 8080;
app.set('port', PORT);

// Pug view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './server/views'));

app.use(session(sess));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/public')));

app.get('/', (req, res) => res.render('index'));


// Hook up routes
require('./server/api')(app);
require('./server/routes')(app);


// ---- ERROR ROUTES -------------------------
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'
        ? err
        : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error', { error: err.message });
});
//--------------------------------------------


/* Starts the server to begin listening
* =============================================================
*/

// Create HTTP server.
const server = http.createServer(app);

server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);

/*
*   SERVER HANDLERS
*/
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;

  debug(`Server listening on ${addr}:${bind}`);
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
