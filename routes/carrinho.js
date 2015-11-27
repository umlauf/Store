var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

  res.render('carrinho/index');

});


router.get('/:produto_id', function(req, res, next) {
  if(!req.session.carrinho) {
    req.session.carrinho = { items:[] };
    req.session.carrinho.items.push({ produto_id:req.params.produto_id, qtde: 1 });
  } else {
    // Só adiciona o produto se ainda não existir no carrinho.
    var existe = req.session.carrinho.items.some(function(item) {
      return item.produto_id == req.params.produto_id;
    });
    if(!existe) {
      req.session.carrinho.items.push({ produto_id:req.params.produto_id, qtde: 1 });
    }
  }
  res.render('carrinho/index', { produto: req.params.produto_id });
});


module.exports = router;