var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = mongoose.model('usuarios');

router.get('/', function(req, res, next) {
  Usuario.findOne({login:req.session.user}, function(err, usuario) {

  //  console.log(usuario);

    if(usuario != undefined) {
      res.render('conta/index', { usuario:usuario });
    } else {
      res.redirect('/conta/login?re=conta');
    }
  });

});

router.post('/', function(req, res, next) {
  var query = {
    login: req.session.user
  };

  var dados = {
    nome: req.body.nome,
    email: req.body.email
  };

  if(req.body.senha != "") {
    dados.senha = req.body.senha;
  }

  Usuario.findOneAndUpdate(query, dados, function(err, usuario) {

    // console.log(usuario);

    req.session.nome = usuario.nome;
    res.render('conta/index', { usuario:usuario });
  });
});




router.get('/login', function(req, res, next) {
  res.render('conta/login', { id: 'login' });
});

router.post('/login', function(req, res, next) {

  Usuario.findOne({login:req.body.login}, function(err, usuario) {

    //console.log(usuario);

    if(usuario) {
      usuario.validPassword(req.body.senha, function(err, valid) {
        if(err) throw err;

        if(valid) {
          req.session.user = req.body.login;
          req.session.nome = usuario.nome;
          if(req.query.re == "conta") {
            res.redirect('/conta');
          } else {
            res.redirect('/');
          }
        } else {
          res.render('conta/login', { id: 'login', message : "Senha inválida." });
        }
      });
    } else {
      res.render('conta/login', { id: 'login', message : "Login inválido." });
    }
  });

});



router.get('/criar', function(req, res, next) {
  res.render('conta/criar');
});

router.post('/criar', function(req, res, next) {
  var usuario = {
    nome : req.body.nome,
    email : req.body.email,
    login : req.body.login,
    senha : req.body.senha,
  };

  new Usuario(usuario)
    .save(function(err, user) {
      //console.log(user)
      res.redirect('/conta');
  });
});



router.get('/sair',function(req, res, next) {
  req.session.destroy(function(err) {
    if(err) {
        console.log(err);
    } else {
      res.redirect('/');
    }
  });
});


router.post('/checkemail', function(req, res, next) {
  Usuario.findOne({email:req.body.email}, function(err, usuario) {
    if(err) {
      res.json({ status: 'ERROR' });
    } else {
      if(usuario) {
        res.json({ status: 'SUCCESS' });
      } else {
        res.json({ status: 'NOTFOUND' });
      }
    }
  });
});


module.exports = router;