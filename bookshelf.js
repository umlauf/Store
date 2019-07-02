'use strict';

var dbConfig = {
  //debug: true,
  client: 'pg',
  connection: "postgres://postgres:123@localhost:5432/owstore",
};

var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('virtuals'); // Compute additional values on your model based on other values


module.exports = bookshelf;