'use strict';

var bookshelf = require("../bookshelf");
var password = require('password-hash-and-salt');


var Usuario = bookshelf.Model.extend({
  tableName: 'usuario',
  idAttribute: 'usuario_id',

  initialize: function() {
    this.on('creating', this.hashPassword, this);
  },

  hashPassword: function(model, attrs, options) {
    // Ver: http://wesleytsai.io/2015/07/28/bookshelf-bcrpyt-password-hashing/
    return new Promise(function(resolve, reject) {
      if(model.attributes.senha) {
        password(model.attributes.senha).hash(function(error, hash) {
          if(error) reject(error);
          model.set('senha', hash);
          resolve(hash); // data is created only after this occurs
        });
      } else {
        resolve();
      }
    });
  },

  validPassword: function(senha, callback) {
    password(senha).verifyAgainst(this.get('senha'), function(error, verified) {
      if(error) {
        console.log(error);
        throw new Error('Erro ao gerar hash no virtual validPassword!');
      }
      //console.log(verified);
      callback(error, verified);
    });
  }
});




module.exports = Usuario;