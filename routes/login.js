var express = require('express');
var router = express.Router();

router.get('/',function(req, res, next) {
  var sess = req.session;
  sess.user = "sergio";
  res.render('login', { id: 'login', session: sess });

});

module.exports = router;
