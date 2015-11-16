var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var User = new Schema({
    username : String,
    email : String
});

mongoose.model('users', User);


var Produto = new Schema({
    titulo : String,
    descricao : String
});

mongoose.model('produtos', Produto);


mongoose.connect('mongodb://localhost:27017/klingklang');
