var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Price = require('format-price');
var password = require('password-hash-and-salt');



// Usuario -------------------------------------------------------------
var Usuario = new Schema({
  nome : String,
  login : String,
  senha : String,
  email : String
});

Usuario.pre('save', function(next) {
  var usuario = this;
  password(usuario.senha).hash(function(error, hash) {
    if(error) throw new Error('Erro ao gerar hash!');
    usuario.senha = hash;
    next();
  });
});

Usuario.pre('findOneAndUpdate', function(next) {
  var query = this;
  password(query.getUpdate().senha).hash(function(error, hash) {
    if(error) throw new Error('Erro ao gerar hash!');
    query.getUpdate().senha = hash;
    next();
  });
});

Usuario.method('validPassword', function(senha, callback) {
  password(senha).verifyAgainst(this.senha, function(error, verified) {
    if(error) throw new Error('Erro ao gerar hash!');
    // if(!verified) {
    //     console.log("Inválida");
    // } else {
    //     console.log("Válida");
    // }
    callback(error, verified);
  });
});

mongoose.model('usuarios', Usuario);



// Produto -------------------------------------------------------------
var imagensSchema = new Schema({
   normal : String,
   grande : String,
   destaque : String
});

var Produto = new Schema({
  sku : String,
  nome : String,
  descricao : String,
  fabricante : String,
  categoria : String,
  valor : Number,
  imagens : imagensSchema,
  destaque : Boolean
});

Produto.method('valorFormatado', function() {
    return Price.format( 'pt-BR', 'BRL', this.valor);
});

mongoose.model('produtos', Produto);



mongoose.connect('mongodb://localhost:27017/owstore');
