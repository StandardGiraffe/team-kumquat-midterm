"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // router.get("/", (req, res) => {
  //   knex
  //     .select("*")
  //     .from("tags")
  //     .then((results) => {
  //       res.json(results);
  //   });
  // });

  router.post("/", (req, res) => {
    console.log("This was received from app.js:");
    console.log(req.body)
    knex("tags")
      .insert({
        category: req.body.tag
      })
      .then((rows) => {
        console.log(rows)
      })
      .catch(function(err) {
        console.error(err);
      })
  });







  return router;
}
