"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/edit_user_profile", (req, res) => {
    knex("users")
      .insert({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar_url: req.body.url,
          bio: req.body.bio
      })
      .then((rows) => {
        console.log(rows)
      })
      .catch(function(err) {
        console.error(err);
      })
  })

  return router;
}

