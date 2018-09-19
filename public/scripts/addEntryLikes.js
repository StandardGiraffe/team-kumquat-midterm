require('dotenv').config();


var knex = require('knex')({
  client: 'postgresql',
  connection: {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    port     : process.env.DB_PORT,
    ssl      : process.env.DB_SSL
  }
});

const likesID = process.argv[2];
const resourceID = process.argv[3];

const addEntryLikes = function() {
  knex('likes').insert({
    id: likesID,
    resource_id: resourceID,
  })
  .then(function(rows) {
    console.log(rows);
  })
  .catch(function(err) {
    console.error(err);
  })
};

addEntryLikes();
