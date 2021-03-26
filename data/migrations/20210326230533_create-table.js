
exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl => {
        tbl.increments();
        tbl.string('username', 200).notNullable().unique();
        tbl.string('password', 200).notNullable();
        tbl.string('department', 200)
    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
