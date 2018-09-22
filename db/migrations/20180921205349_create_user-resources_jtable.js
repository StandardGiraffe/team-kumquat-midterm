
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user-resources', function (table) {
    table.integer('user_id').references('id').inTable('users');
    table.integer('resource_id').references('id').inTable('resources');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user-resources');
};
