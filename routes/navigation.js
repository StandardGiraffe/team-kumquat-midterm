"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

//#####################
//        GET
//#####################

  // // From skeleton
  // router.get("/", (req, res) => {
  //   knex
  //     .select("*")
  //     .from("users")
  //     .then((results) => {
  //       res.json(results);
  //   });
  // });

  router.get("/login", (req, res) => {
    res.render("login");
  })


//#####################
//       POST
//#####################





  return router;
}
