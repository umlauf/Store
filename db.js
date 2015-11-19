var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Usuario = new Schema({
  nome: String,
  login : String,
  senha : String,
  email : String
});

mongoose.model('usuarios', Usuario);


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


mongoose.model('produtos', Produto);


mongoose.connect('mongodb://localhost:27017/owstore');
