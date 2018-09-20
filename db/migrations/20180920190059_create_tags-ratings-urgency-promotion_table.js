
exports.up = async function(knex, Promise) {
  await knex.schema.table('users', function (table) {
    table.string('email');
    table.string('password');
    table.string('avatar_url');
  });
  await knex.schema.table('resources', function (table) {
    table.string('tags');
  });
  await knex.schema.createTable('ratings', function (table) {
    table.increments('id').primary();
    table.integer('value');
    table.integer('user_id').references('id').inTable('users');
    table.integer('resource_id').references('id').inTable('resources');
  });
  await knex.schema.createTable('urgency', function (table) {
    table.increments('id').primary();
    table.integer('status');
    table.integer('user_id').references('id').inTable('users');
    table.integer('resource_id').references('id').inTable('resources')
  });
  return knex.schema.createTable('promotion', function (table) {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users');
    table.integer('resource_id').references('id').inTable('resources');
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('tags');
  await knex.schema.dropTable('ratings');
  await knex.schema.dropTable('urgency');
  return knex.schema.dropTable('promotion');
};
