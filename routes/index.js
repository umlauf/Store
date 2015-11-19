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
      // res.render(
      //   'index',
      //   {content: content, destaques : destaques, id: 'home', session : sess}
      // );
      //req.destaques = JSON.stringify(destaques);
      req.destaques = destaques;
      //console.log(req.destaques);
      next();
    });
  },
  function(req, res) {
    var sess = req.session;
    var content = ""; //React.renderToString(App());

    //console.log(req.destaques);

    Produto.find(function(err, produtos) {
      //console.log(produtos);
      res.render(
        'index',
        {content: content, destaques : req.destaques, produtos : produtos, id: 'home', session : sess}
      );
    });
  }
);

function buscaDestaques() {
  Produto.find({destaque : true}, function(err, destaques) {
    //console.log(produtos);
    res.render(
      'index',
      {content: content, destaques : destaques, id: 'home', session : sess}
    );
  });
}

module.exports = router;
