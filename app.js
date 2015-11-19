var express = require('express');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

require('./db');

var routes = require('./routes/index');
var usuarios = require('./routes/usuarios');
var produtos = require('./routes/produtos');
var login = require('./routes/login');
var logout = require('./routes/logout');

var app = express();
var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/owstore_sessions',
    collection: 'sessions'
  });

store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.locals.sprintf = require("sprintf-js").sprintf;

//app.use(session({secret: 'ssshhhhh'}));
//http://stackoverflow.com/questions/24477035/express-4-0-express-session-with-odd-warning-message
app.use(require('express-session')({
  secret: 'owstoresecret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/usuarios', usuarios);
app.use('/produtos', produtos);
app.use('/login', login);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
