var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Produto = mongoose.model('produtos');
var Price = require('format-price');


router.get('/', function(req, res, next) {
  if(req.session.carrinho && req.session.carrinho.items) {
    var predicate = [];
    req.session.carrinho.items.forEach(function(item) {
      predicate.push(item.produto_id);
      console.log(item.produto_id);
    });

    Produto.find({ _id: { $in: predicate } }, function(err, produtos){
      // TODO: melhorar esse loop dentro de loop.
      if(produtos) {
        console.log("ok");
        produtos.forEach(function(produto) {
          req.session.carrinho.items.forEach(function(item) {
            if(produto._id == item.produto_id) {
              produto.qtde = item.qtde;
              produto.valorTotalFormatado = Price.format( 'pt-BR', 'BRL', produto.valor * produto.qtde);
            }
          });
        });
      }
      res.render(
        'carrinho/index',
        {title : "Produtos", items : produtos}
      );
    });
  } else {
    res.render(
      'carrinho/index',
      {title : "Produtos", items : []}
    );
  }
});


router.get('/:produto_id', function(req, res, next) {
  if(!req.session.carrinho) {
    req.session.carrinho = { items: [] };
    req.session.carrinho.items.push({ produto_id: req.params.produto_id, qtde: 1 });
  } else {
    // Só adiciona o produto se ainda não existir no carrinho.
    var existe = req.session.carrinho.items.some(function(item) {
      return item.produto_id == req.params.produto_id;
    });
    if(!existe) {
      req.session.carrinho.items.push({ produto_id: req.params.produto_id, qtde: 1 });
    }
  }
  res.redirect('/carrinho');
});


module.exports = router;