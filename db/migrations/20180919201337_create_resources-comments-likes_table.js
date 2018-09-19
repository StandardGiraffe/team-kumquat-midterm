
exports.up = async function(knex, Promise) {
  await knex.schema.createTable('resources', function (table) {
    table.increments('id').primary();
    table.string('title', 40);
    table.string('description', 200);
    table.string('url');
    table.timestamp('date_created');
    table.string('picture_url');
  });
  await knex.schema.createTable('comments', function (table) {
    table.increments('id').primary();
    table.string('comment_body', 400);
    table.timestamp('date_created');
    table.integer('resource_id').references('id').inTable('resources');
  });
  return knex.schema.createTable('likes', function (table) {
    table.increments('id').primary();
    table.integer('resource_id').references('id').inTable('resources');
  });
};

exports.down = async function(knex, Promise) {
  await knex.schema.dropTable('resources');
  await knex.schema.dropTable('comments');
  return knex.schema.dropTable('likes');
};
