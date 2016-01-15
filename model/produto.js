'use strict';

var bookshelf = require("../bookshelf");
var Imagem = require("./imagem");
var Price = require('format-price');


var Produto = bookshelf.Model.extend({
    tableName: 'produto',
    idAttribute: 'produto_id',
    imagens: function() {
      return this.hasMany(Imagem, ['produto_id']);
    },
    virtuals: {
      valorFormatado: function() {
          return Price.format( 'pt-BR', 'BRL', this.get('valor'));
      }
    }
});

module.exports = Produto;