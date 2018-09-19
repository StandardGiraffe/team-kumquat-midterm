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

const resourceID = process.argv[2];
const title = process.argv[3];
const description = process.argv[4];
const url = process.argv[5];
const dateCreated = process.argv[6];
const picture_url = process.argv[7];

const addEntryResources = function() {
  knex('resources').insert({
    id: resourceID,
    title: title,
    description: description,
    url: url,
    date_created: dateCreated,
    picture_url: picture_url
  })
  .then(function(rows) {
    console.log(rows);
  })
  .catch(function(err) {
    console.error(err);
  })
};

addEntryResources();
