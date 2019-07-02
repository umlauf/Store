'use strict';

var bookshelf = require("../bookshelf");

var Produto = require("./produto");

var Imagem = bookshelf.Model.extend({
  tableName: 'imagem',
  idAttribute: 'imagem_id',
  produto: function() {
    return this.belongsTo(Produto, ['produto_id']);
  }
});

module.exports = Imagem;