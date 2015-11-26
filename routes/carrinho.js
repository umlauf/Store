var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

      res.render('carrinho/index');

});


router.get('/:produto_id', function(req, res, next) {

      res.render('carrinho/index', { produto: req.params.produto_id });

});


module.exports = router;