"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("resources")
      .then((results) => {
        res.json(results);
    });
  });

  // router.post("/", (req, res) => {
  //   knex
  //     .select("*")
  //     .from("resources")
  //     .then((results) => {
  //       res.json(results);
  //   });
  // });






  return router;
}
