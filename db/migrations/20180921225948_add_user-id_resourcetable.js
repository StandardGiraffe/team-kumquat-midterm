
exports.up = function(knex, Promise) {
  return knex.schema.table('resources', function (table) {
    table.integer('user_id');
  });
};

exports.down = function(knex, Promise) {

};
