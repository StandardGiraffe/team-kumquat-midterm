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

});*/

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

// Add new resource
// app.get("/users/:id/new", (req, res) => {
//   res.render("new_resource");
// });

app.get("/new_resource", async (req, res) => {
let kumquat = await grabity.grab("https://www.flickr.com");

  let templatevars = {kumquat:kumquat}

  res.render("new_resource", templatevars);
  console.log('kumquat', kumquat)
  /*(async () => {
 let it = await grabity.grabIt("https://www.flickr.com");

 console.log(it);
})();*/

});



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
