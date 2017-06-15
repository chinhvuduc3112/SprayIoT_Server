"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose');

module.exports = (router) => {
  router.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    models.user.findOne({username, password}, (err, user) => {
      if (user !== null) {
        res.json({auth: "ok"});
      } else {
        res.json({auth: "failed"});
      }
    });
  });

}