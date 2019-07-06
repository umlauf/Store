'use strict';

var dbConfig = {
  //debug: true,
  client: 'pg',
  connection: process.env.BOOKSHELF_DB_URL
};

var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('virtuals'); // Compute additional values on your model based on other values


module.exports = bookshelf;
