var express = require('express');
var router = express.Router();
var Produto = require('../model/produto');


/* GET home page. */
router.get('/', function(req, res, next) {
  var content = "";

  Produto.where('destaque', true).fetchAll({withRelated: ['imagens']}).then(function(destaques) {
    Produto.where('destaque', false).fetchAll({withRelated: ['imagens']}).then(function(produtos) {
      res.render('index', {
        content: content,
        destaques: destaques.toJSON(),
        produtos: produtos.toJSON(),
        id: 'home'
      });
    }).catch(function(error) {
      console.log(error);
      res.send('Erro');
    });
  }).catch(function(error) {
    console.log(error);
    res.send('Erro');
  });

});

module.exports = router;
