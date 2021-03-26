
exports.seed = function(knex) {
      return knex('users').insert([
        { username: 'test1', password: 'qwe123'},
        { username: 'test2', password: 'qwe123'},
        { username: 'test3', password: 'qwe123'}
      ]);
};
