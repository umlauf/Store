var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Produto = mongoose.model('produtos');

/* GET produtos listing. */
router.get('/', function(req, res, next) {
  Produto.find(function(err, produtos){
    //console.log(produtos);
    res.render(
      'produtos/index',
      {title : "Produtos", produtos : produtos, id: 'produtos'}
    );
  });

});


router.get('/novo', function(req, res, next) {

    res.render('produtos/form', {title : "Produtos", id: 'produtos'});

});


router.post('/create', function(req, res, next) {

  new Produto({titulo : req.body.titulo, descricao : req.body.descricao})
    .save(function(err, prod) {
      console.log(prod)
      res.redirect('/produtos');
  });

});


/* GET um produto */
router.get('/:id', function(req, res, next) {

    var id = req.params.id;

    Produto.findOne({ _id: id },function(err, prod) {
      //console.log(prod);
      res.render(
        'produtos/show',
        {title : "Produto", produto: prod, id: 'produtos'}
      );
    });

});




module.exports = router;
