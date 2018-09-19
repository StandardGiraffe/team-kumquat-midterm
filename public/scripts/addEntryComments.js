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

const commentsID = process.argv[2];
const comment_body = process.argv[3];
const date_created = process.argv[4];
const resource_id = process.argv[5];

const addEntryComments = function() {
  knex('comments').insert({
    id: commentsID,
    comment_body: comment_body,
    date_created: date_created,
    resource_id: resource_id,
  })
  .then(function(rows) {
    console.log(rows);
  })
  .catch(function(err) {
    console.error(err);
  })
};

addEntryComments();
