var express = require('express');
var router = express.Router();

require("node-jsx").install({
  harmony: true,
  extension: ".jsx"
});

var React = require("react"),
    App = React.createFactory(require("../components/app"));

/* GET home page. */
router.get('/', function(req, res, next) {

  var sess = req.session;

  var content = ""; //React.renderToString(App());

  res.render('index', { content: content, id: 'home', session : sess });

});

module.exports = router;
