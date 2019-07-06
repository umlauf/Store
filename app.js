var express = require('express');
var session = require('express-session');
var dotenv = require('dotenv').config();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var pg = require('pg')
  , pgSession = require('connect-pg-simple')(session);

var index = require('./routes/index');
var produtos = require('./routes/produtos');
var conta = require('./routes/conta');
var carrinho = require('./routes/carrinho');
var checkout = require('./routes/checkout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.locals.sprintf = require("sprintf-js").sprintf;

var store = new pgSession({
  pg: pg,
  conString: process.env.PG_SESSION_URL,
  tableName: 'session'
});

app.use(session({
  store: store,
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 1 week
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

app.use(function(req, res, next) {
  app.locals.session = req.session;
  next();
});


app.use('/', index);
app.use('/produtos', produtos);
app.use('/conta', conta);
app.use('/carrinho', carrinho);
app.use('/checkout', checkout);


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
