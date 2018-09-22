
exports.up = function(knex, Promise) {
  return knex.schema.table('resources', function (table) {
    table.integer('rating');
    table.integer('likes');
  });
};

exports.down = function(knex, Promise) {

};
