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

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/resources", resourcesRoutes(knex));
app.use("/api/comments", commentsRoutes(knex));
app.use("/api/likes", likesRoutes(knex));
app.use("/api/ratings", ratingsRoutes(knex));
app.use("/api/urgency", urgencyRoutes(knex));
app.use("/api/promotion", promotionRoutes(knex));
app.use("/api/navigation", navigationRoutes(knex));


//########################################
// LOAD PAGES
//########################################

// Home page
app.get("/", (req, res) => {
  res.render("index");
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
