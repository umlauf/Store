var express = require('express');
var router = express.Router();
var Produto = require('../model/produto');

/* GET produtos listing. */
router.get('/', function(req, res, next) {
  Produto.fetchAll().then(function(produtos) {
    res.render(
      'produtos/index',
      {title : "Produtos", produtos : produtos.toJSON(), id: 'produtos'}
    );
  });
});


router.get('/novo', function(req, res, next) {
    res.render('produtos/form', {title : "Produtos", id: 'produtos'});
});


router.post('/create', function(req, res, next) {
  new Produto({nome : req.body.nome, descricao : req.body.descricao})
    .save()
    .then(function(produto) {
      res.redirect('/produtos');
    })
    .catch(function(error) {
      console.log(error);
      res.send('Erro');
    });
});


/* GET um produto */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;

    new Produto({'produto_id': id})
      .fetch()
      .then(function(produto) {
        res.render(
          'produtos/show',
          {title : "Produto", produto: produto.toJSON(), id: 'produtos'}
        );
      })
      .catch(function(error) {
        console.log(error);
        res.send('Erro');
      });
});




module.exports = router;
