exports.up = function(knex, Promise) {
  return knex.schema.createTable('usuario', function (table) {
    table.increments('usuario_id').primary();
    table.string('nome', 500);
    table.string('email', 500);
    table.string('login', 15);
    table.string('senha', 300);
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('usuario');
};
