var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var sess = req.session;

  res.render('login', { id: 'login', session: sess });

});

router.post('/enter', function(req, res, next) {

  // TODO: validar usuário no banco.

  var sess = req.session;
  sess.user = req.body.username;

  res.redirect('/');

});

module.exports = router;
