var express = require('express');
var router = express.Router();
var frete = require('frete');

frete.cepOrigem('04313000').servico([ frete.codigos.sedex10, frete.codigos.sedex, frete.codigos.pac ]);

router.post('/frete', function(req, res, next) {
  frete()
    .peso(1)
    .formato(1)
    .comprimento(16)
    .altura(2)
    .largura(11)
    .diametro(1)
    .maoPropria('N')
    .valorDeclarado(50)
    .avisoRecebimento('S')
    .precoPrazo(req.body.cep, function (err, results) {
          console.log(err);
          console.log(results);
          if(err) {
            res.json({ status: 'ERROR' });
          } else {
            res.json({ status: 'SUCCESS', dados: results });
          }
      });
});


module.exports = router;