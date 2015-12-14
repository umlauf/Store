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
      //console.log(item.produto_id);
    });

    var total = 0;
    Produto.find({ _id: { $in: predicate } }, function(err, produtos) {
      // TODO: melhorar esse loop dentro de loop.
      if(produtos) {
        produtos.forEach(function(produto) {
          req.session.carrinho.items.forEach(function(item) {
            if(produto._id == item.produto_id) {
              produto.qtde = item.qtde;
              produto.valorTotalFormatado = Price.format( 'pt-BR', 'BRL', produto.valor * produto.qtde);
              total += produto.valor * produto.qtde;
            }
          });
        });
      }
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
          // session saved
          if(err) {
            //res.json({ status: 'ERROR', msg: err });
            req.status = 'ERROR';
            req.msg = err;
          } else {
            //res.json({ status: 'SUCCESS' });
            req.status = 'SUCCESS';
          }
          next();
        })
      }
    });
  },
  function(req, res, next) {
    if(req.session.carrinho && req.session.carrinho.items) {
      var predicate = [];
      req.session.carrinho.items.forEach(function(item) {
        predicate.push(item.produto_id);
        //console.log(item.produto_id);
      });

      var total = 0;
      Produto.find({ _id: { $in: predicate } }, function(err, produtos) {
        // TODO: melhorar esse loop dentro de loop.
        if(produtos) {
          produtos.forEach(function(produto) {
            req.session.carrinho.items.forEach(function(item) {
              if(produto._id == item.produto_id) {
                produto.qtde = item.qtde;
                produto.valorTotalFormatado = Price.format( 'pt-BR', 'BRL', produto.valor * produto.qtde);
                total += produto.valor * produto.qtde;
              }
            });
          });
        }
        var totalFormatado = Price.format( 'pt-BR', 'BRL', total);
        res.json({status: req.status, msg: req.msg, total: total, totalFormatado: totalFormatado});
      });
    } else {
      res.json({ status: 'ERROR', msg: 'Carrinho vazio.', total: 0, totalFormatado: 'R$ 0,00' });
    }
  }

);


router.get('/total');


module.exports = router;