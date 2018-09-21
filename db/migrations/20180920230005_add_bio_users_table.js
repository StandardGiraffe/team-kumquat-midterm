
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.string('bio');
  });
};

exports.down = function(knex, Promise) {

};
