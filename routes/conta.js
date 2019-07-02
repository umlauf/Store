var express = require('express');
var router = express.Router();
var Usuario = require('../model/usuario');
var password = require('password-hash-and-salt');


router.get('/', function(req, res, next) {
  if(req.session.user) {
    new Usuario({'login': req.session.user})
      .fetch()
      .then(function(usuario) {
        if(usuario) {
          res.render('conta/index', { usuario: usuario.toJSON() });
        } else {
          res.redirect('/conta/login?re=conta');
        }
      })
      .catch(function(error) {
        res.redirect('/conta/login?re=conta');
      });
  } else {
    res.redirect('/conta/login?re=conta');
  }
});

router.post('/', function(req, res, next) {
  var query = {
    'usuario_id': req.session.usuario_id,
    'login': req.session.user
  };

  var dados = {
    nome: req.body.nome,
    email: req.body.email
  };

  if(req.body.senha != "") {
    password(req.body.senha).hash(function(error, hash) {
      if(error) throw new Error(error);
      dados.senha = hash;
      saveUser(query, dados, req, res);
    });
  } else {
    saveUser(query, dados, req, res);
  }
});

var saveUser = function(query, dados, req, res) {
  new Usuario(query)
    .save(dados, {patch: true})
    .then(function(usuario) {
      if(usuario) {
        req.session.nome = usuario.toJSON().nome;
        res.render('conta/index', { usuario: usuario.toJSON() });
      } else {
        res.redirect('/conta');
      }
    })
    .catch(function(error) {
      console.log(error);
      res.redirect('/conta');
    });
};


router.get('/login', function(req, res, next) {
  res.render('conta/login', { id: 'login' });
});


router.post('/login', function(req, res, next) {
  new Usuario({'login': req.body.login})
    .fetch()
    .then(function(usuario) {
      //console.log(usuario);
      if(usuario) {
        usuario.validPassword(req.body.senha, function(err, valid) {
          if(err) throw err;
          //console.log(valid);
          if(valid) {
            req.session.user = usuario.toJSON().login;
            req.session.nome = usuario.toJSON().nome;
            req.session.usuario_id = usuario.toJSON().usuario_id;
						req.session.save(function(err) {
							if (err) return next(err);
              if(req.query.re == "conta") {
                res.redirect('/conta');
              } else {
                res.redirect('/');
              }
						});
          } else {
            res.render('conta/login', { id: 'login', message : "Senha inválida." });
          }
        });
      } else {
        res.render('conta/login', { id: 'login', message : "Usuário inválido." });
      }
    })
    .catch(function(error) {
      console.log(error);
      res.send('Erro');
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
    .save()
    .then(function(user) {
      //console.log(user)
      res.redirect('/conta');
    })
    .catch(function(error) {
      console.log(error);
      res.send('Erro');
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
  new Usuario({'email': req.body.email})
    .fetch()
    .then(function(usuario) {
      if(usuario) {
        res.json({ status: 'SUCCESS' });
      } else {
        res.json({ status: 'NOTFOUND' });
      }
    })
    .catch(function(error) {
      res.json({ status: 'ERROR' });
    });
});


module.exports = router;