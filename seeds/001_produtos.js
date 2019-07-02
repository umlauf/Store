exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('imagem').del(),
    knex('produto').del(),
    // Talvez você tenha que mudar o nome da SEQUENCE aqui.
    knex.raw('ALTER SEQUENCE imagem_imagem_id_seq RESTART WITH 1;'),
    knex.raw('ALTER SEQUENCE produto_produto_id_seq RESTART WITH 1;'),

    // Inserts seed entries
    knex('produto').insert({
      // produto_id: 1,
      sku: 'ABC-1234',
      nome: 'FLNM 10 20 20',
      descricao: 'FLNM 10 20 20',
      valor: 100,
      destaque: false
    }),
    knex('produto').insert({
      // produto_id: 2,
      sku: 'CDE-2837',
      nome: 'BASIN 30 00 00 NA Basic I',
      descricao: 'BASIN 30 00 00 NA Basic I',
      valor: 350.50,
      destaque: false
    }),
    knex('produto').insert({
      // produto_id: 3,
      sku: 'EDF-1928',
      nome: 'STRAF 04 16 16 STR (50 BMI)',
      descricao: 'STRAF 04 16 16 STR (50 BMI)',
      valor: 230.99,
      destaque: true
    }),
    knex('produto').insert({
      // produto_id: 4,
      sku: 'XYZ-8898',
      nome: 'FFALM 05 25 15 + 0,30 FTCO',
      descricao: 'FFALM 05 25 15 + 0,30 FTCO',
      valor: 1500,
      destaque: false
    }),
    knex('produto').insert({
      // produto_id: 5,
      sku: 'JKP-6221',
      nome: 'KMAGU 24 00 18 UR Kmag+2,2Mg',
      descricao: 'KMAGU 24 00 18 UR Kmag+2,2Mg',
      valor: 658.60,
      destaque: true
    }),
    knex('produto').insert({
      // produto_id: 6,
      sku: 'WHN-3125',
      nome: 'STRAF 03 20 18 STR (100 BMI)',
      descricao: 'STRAF 03 20 18 STR (100 BMI)',
      valor: 8.75,
      destaque: true
    }),
    knex('produto').insert({
      // produto_id: 7,
      sku: 'ABC-0991',
      nome: 'KMAGF 04 13 07 Kmag+2,2Mg',
      descricao: 'KMAGF 04 13 07 Kmag+2,2Mg',
      valor: 2630,
      destaque: false
    }),
    knex('produto').insert({
      // produto_id: 8,
      sku: 'IWO-6235',
      nome: 'FFALM 03 20 20',
      descricao: 'FFALM 03 20 20',
      valor: 162,
      destaque: false
    })
  );
};