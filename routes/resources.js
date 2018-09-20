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

  router.post("/", (req, res) => {
    console.log("This was received from app.js:");
    console.log(req.body)
    let currentDate = new Date();
    console.log("currentDate = " + currentDate);
    knex("resources")
      .insert({
        title: req.body.title,
        url: req.body.url,
        description: req.body.description,
        date_created: currentDate,
        picture_url: "To be insert using Open Graph"
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
