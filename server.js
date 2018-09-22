"use strict";

//########################################
// DECLARE/REQUIRE
//########################################

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');
const grabity = require("grabity");
const cookieParser = require('cookie-parser');

let kumquat = (async () => {
  let tags = await grabity.grab("https://www.flickr.com");

  return tags;
})


//########################################
// DATABASE ROUTES
// Separated Routes for each Resource
//########################################

const usersRoutes = require("./routes/users");
const resourcesRoutes = require("./routes/resources");
const commentsRoutes = require("./routes/comments");
const likesRoutes = require("./routes/likes");
const ratingsRoutes = require("./routes/ratings");
const urgencyRoutes = require("./routes/urgency");
const promotionRoutes = require("./routes/promotion");
const navigationRoutes = require("./routes/navigation");




//########################################
// RUN/USE MIDDLEWARE
//########################################
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieParser());

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/resources", resourcesRoutes(knex));
app.use("/api/comments", commentsRoutes(knex));
app.use("/api/likes", likesRoutes(knex));
app.use("/api/ratings", ratingsRoutes(knex));
app.use("/api/urgency", urgencyRoutes(knex));
app.use("/api/promotion", promotionRoutes(knex));
app.use("/api/navigation", navigationRoutes(knex));

/*function searchUsers(req, res) {

  knex.select('*')
    .from('users')
    // .where('users', 'ILIKE', '%%')
    .asCallback(function(err, rows) {
      if (err) return console.error(err);
      console.log(`Loading users into page..`);
      // loadResults(rows);
      console.log(rows);

      let templatevars = {
        results: rows
      }
      res.render("results", templatevars);

      // knex.destroy();   // force closes the pooling
    });
}*/


//########################################
// LOGIN INFORMATION
//########################################

// const loginInfo = require("./scripts/loginInfo");
var me = "Raymond";
var other_users = "";




//########################################
// LOAD PAGES
//########################################


// Log in
app.post("/login", (req, res) => {
  console.log("req.body.username: " + req.body.username);
  console.log("req.body.password: " + req.body.password);
  var inputUsername = req.body.username;
  var inputPassword = req.body.password;

  knex('users').where('name', inputUsername)
    .asCallback(function(err, rows) {
      if (err) return console.error(err);
        console.log(rows[0]);
        // if (rows[0].password === inputPassword) {
        //   console.log('Welome back');
        //   me = rows[0].name;
        //   let templatevars = {
        //     userInfo: rows
        //   }

          res.redirect("/");
        // } else {
        //   console.log("Nothing will happen yet..")
        //   $error.text("Your username or password is incorrect.")
        //   $('#login-error').show()
        // }
      })
  })





// Search by user
app.get("/search", (req, res) => {
  //searchUsers(req, res)
  console.log("You saw me.", req.query);
  knex.select('*')
    .from('users')
    // .where('users', 'ILIKE', '%%')
    .asCallback(function(err, rows) {
      if (err) return console.error(err);
      console.log(`Loading users into page..`);
      // loadResults(rows);
      console.log(rows);

      let templatevars = {
        results: rows
      }
  res.render("results", templatevars);
    });

});

// Returns an array with a single object, being the resources table object from the database.  Remember to access the result at [0]
const findResourceById = async function (resourceId) {
  return await knex('resources').where('id', resourceId);
}


// Returns an array with a single object, being the users table object from the database.  Remember to access the result at [0].
const findUserById = async function (userId) {
  return await knex('users').where('id', userId);
}

// Returns an array of objects containing the resources associated with the passed userID. Iterate through the array to access them.
const findResourcesByUser = async function (userId) {
  return await knex.select("*").from("resources").join("users", "users.id", "=", "resources.user_id").where('users.id', userId);
}

// Returns an array of objects containing the resources associated with the passed userID. Iterate through the array to access them.
const findUserByResource = async function (resourceId) {
  return await knex.raw(`SELECT users.name, users.id FROM users JOIN resources ON resources.user_id=users.id WHERE resources.id = ${resourceId}`);
  // return await knex.select("name").from("users").join("resources", "users.id", "=", "resources.user_id").where('resources.user_id', resourceId);
}



// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Login page
app.get("/login", (req, res) => {
  res.render("login");
});

// Results page
app.get("/results", (req, res) => {});

// Registration page
app.get("/register", (req, res) => {
  res.render("register");
});

// Load Edit Profile Page
app.get("/edit", (req, res) => {
  knex('users').where('name', me)
    .asCallback(function(err, rows) {
      if (err) return console.error(err);
        let templatevars = {
          userInfo: rows[0]
        }
        res.render("edit_user_profile", templatevars);
  });
})

// Edit Profile
app.post("/edit", (req, res) => {
  console.log(req.body.name)
  console.log(req.body.email)
  console.log(req.body.password)
  console.log(req.body.avatar)
  console.log(req.body.bio)
  knex('users').where('name', req.body.username)
    .update({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar_url: req.body.avatar,
      bio: req.body.bio
    })
  knex('users').where('name', req.body.username)
    .asCallback(function(err, rows) {
      if (err) return console.error(err);
        console.log("This is the updated info:");
        console.log(rows[0]);
        let templatevars = {
          userInfo: rows[0]
        }
        res.redirect("index", templatevars);
    });
})

// Individual resource page
app.get("/resource/:resourceid", async (req, res) => {
  let userName = await (findUserByResource(req.params.resourceid));
  let resourceRecord = await findResourceById(req.params.resourceid);
  console.log("Username is:", userName);

  console.log(resourceRecord[0]);

  let resourcePicture = await grabity.grab(resourceRecord[0].url);
  let templatevars = {
    picture: resourcePicture["og:image"],
    user: userName.rows[0],
    kumquat: resourceRecord[0]
  }
  res.render("view_resource", templatevars);
})

// Testing Porp: User by ID
app.get("/user/:userId", async (req, res) => {
  let userRecord = await findUserById(req.params.userId);
  console.log(userRecord[0]);
})


// Add new resource
// app.get("/users/:id/new", (req, res) => {
//   res.render("new_resource");
// });

app.get("/new_resource", async (req, res) => {
  // Testing grabity on page
  // let kumquat = await grabity.grab("https://www.flickr.com");
  // let templatevars = {kumquat:kumquat}
  res.render("new_resource");
  /*(async () => {
    let it = await grabity.grabIt("https://www.flickr.com");
    console.log(it);
  })();*/
});


app.post("/new_resource", async (req,res) => {
  let currentDate = new Date();
  let kumquat = await grabity.grab(req.body['url']);
  let pictureURL = kumquat["og:image"];
  knex("resources")
    .insert({
      title: req.body['title'],
      url: req.body['url'],
      description: req.body['description'],
      date_created: currentDate,
      tags: req.body['tags'],
      picture_url: pictureURL,
      user_id: 5
    })
    .then((rows) => {
      console.log(rows)
    })
    .catch(function(err) {
      console.error(err);
    })
  res.redirect("/users/5");
})



// Other user's Profile
app.get("/users/:id/", (req, res) => {
  res.render("other_user_profile");
});



// // User Profile page
// app.get("/:id", (req, res) => {
//   res.render("/:id");
// });




//########################################
// LISTEN PORT
//########################################

app.listen(PORT, () => {
  console.log("Kumquat app listening on port " + PORT);
});
