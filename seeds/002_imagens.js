
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('imagem').del(),

    // Inserts seed entries
    knex('imagem').insert(
      {
        produto_id: 1,
        normal    : 'ABC-0001.png',
        grande    : 'ABC-0001.png',
        destaque  : 'ABC-0001_d.png'
      }),
    knex('imagem').insert(
      {
        produto_id: 2,
        normal    : 'ABC-0002.png',
        grande    : 'ABC-0002.png',
        destaque  : 'ABC-0002_d.png'
      }),
    knex('imagem').insert(
      {
        produto_id: 3,
        normal    : 'ABC-0003.png',
        grande    : 'ABC-0003.png',
        destaque  : 'ABC-0003_d.png'
      }),
    knex('imagem').insert(
      {
        produto_id: 4,
        normal    : 'ABC-0004.png',
        grande    : 'ABC-0004.png',
        destaque  : 'ABC-0004_d.png'
      }),
    knex('imagem').insert(
      {
        produto_id: 5,
        normal    : 'ABC-0005.png',
        grande    : 'ABC-0005.png',
        destaque  : 'ABC-0005_d.png'
      }),
    knex('imagem').insert(
      {
        produto_id: 6,
        normal    : 'ABC-0006.png',
        grande    : 'ABC-0006.png',
        destaque  : 'ABC-0006_d.png'
      }),
    knex('imagem').insert(
      {
        produto_id: 7,
        normal    : 'ABC-0007.png',
        grande    : 'ABC-0007.png',
        destaque  : 'ABC-0007_d.png'
      }),
    knex('imagem').insert(
      {
        produto_id: 8,
        normal    : 'ABC-0008.png',
        grande    : 'ABC-0008.png',
        destaque  : 'ABC-0008_d.png'
      })
  );
};
