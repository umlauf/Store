var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Produto = mongoose.model('produtos');

require("node-jsx").install({
  harmony: true,
  extension: ".jsx"
});

var React = require("react"),
    App = React.createFactory(require("../components/app"));

/* GET home page. */
router.get('/',
  function(req, res, next) {
    Produto.find({destaque : true}, function(err, destaques) {
      req.destaques = destaques;
      //console.log(req.destaques);
      next();
    });
  },
  function(req, res) {
    var content = ""; //React.renderToString(App());

    //console.log(req.destaques);

    Produto.find(function(err, produtos) {
      //console.log(produtos);
      res.render(
        'index',
        {content: content, destaques : req.destaques, produtos : produtos, id: 'home'}
      );
    });
  }
);


module.exports = router;
