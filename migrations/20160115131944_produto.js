exports.up = function(knex, Promise) {
  return knex.schema.createTable('produto', function(table) {
    table.increments('produto_id').primary();
    table.string('sku', 30);
    table.string('nome', 300);
    table.string('descricao', 1000);
    table.string('fabricante', 300);
    table.string('categoria', 100);
    table.decimal('valor', 11, 2);
    table.boolean('destaque');
    table.timestamps();
  }).createTable('imagem', function(table) {
    table.increments('imagem_id').primary();
    table.string('normal', 500);
    table.string('grande', 500);
    table.string('destaque', 500);
    table.integer('produto_id').unique().references('produto.produto_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('produto')
      .dropTable('imagem');
};
