var express = require('express');
var router = express.Router();
var Price = require('format-price');
var Produto = require('../model/produto');
var _ = require('lodash');


var produtosDoBd = function(carrinho, prox) {
  var predicate = _.pluck(carrinho.items, 'produto_id');

  var total = 0;
  var p;

  Produto.query('whereIn', 'produto_id', predicate)
    .fetchAll()
    .then(function(produtos) {
      var produtosJson = produtos.toJSON();
      produtosJson.forEach(function(produto) {
        p = _.find(carrinho.items, 'produto_id', _(produto.produto_id).toString());
        if(p) {
          produto.qtde = p.qtde;
          produto.valorTotalFormatado = Price.format( 'pt-BR', 'BRL', produto.valor * produto.qtde);
          total += produto.valor * produto.qtde;
        }
      });
      prox(produtosJson, total);
    });
};


router.get('/', function(req, res, next) {
  if(req.session.carrinho && req.session.carrinho.items) {
    produtosDoBd(req.session.carrinho, function(produtos, total) {
      var totalFormatado = Price.format( 'pt-BR', 'BRL', total);
      res.render(
        'carrinho/index',
        {title : "Produtos", items : produtos, total: total, totalFormatado: totalFormatado}
      );
    });
  } else {
    res.render(
      'carrinho/index',
      {title : "Produtos", items : []}
    );
  }
});



router.get('/checkout', function(req, res, next) {
  if(req.session.carrinho && req.session.carrinho.items) {
    produtosDoBd(req.session.carrinho, function(produtos, total) {
      var totalFormatado = Price.format( 'pt-BR', 'BRL', total);
      res.render(
        'carrinho/checkout',
        {items : produtos, total: total, totalFormatado: totalFormatado}
      );
    });
  } else {
    res.render('carrinho/checkout', {items : []});
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


router.get('/update/:produto_id',
  function(req, res, next) {
    //console.log("Produto = " + req.params.produto_id);
    //console.log("Quantidade = " + req.query.q);
    req.session.carrinho.items.forEach(function(item, i) {
      if(item.produto_id == req.params.produto_id) {
        //console.log("Produto Achado = " + item.produto_id + " no índice " + i);
        item.qtde = req.query.q;
        req.session.save(function(err) {
          if(err) {
            req.status = 'ERROR';
            req.msg = err;
          } else {
            req.status = 'SUCCESS';
          }
          next();
        })
      }
    });
  },
  function(req, res, next) {
    if(req.session.carrinho && req.session.carrinho.items) {
      produtosDoBd(req.session.carrinho, function(produtos, total) {
        var totalFormatado = Price.format( 'pt-BR', 'BRL', total);
        res.json({status: req.status, msg: req.msg, total: total, totalFormatado: totalFormatado});
      });
    } else {
      res.json({ status: 'ERROR', msg: 'Carrinho vazio.', total: 0, totalFormatado: 'R$ 0,00' });
    }
  }
);




module.exports = router;