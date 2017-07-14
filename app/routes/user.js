"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose');

module.exports = {
  login: (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    models.user.findOne({username, password}, (err, user) => {
      if (user !== null) {
        res.json({auth: "ok"});
      } else {
        res.json({auth: "failed"});
      }
    });
  },

  addUser: (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var idGroupUser = req.body.idGroupUser;
    var idInfoUser = req.body.idInfoUser;
    var trash = req.body.trash;
    var newUser = {
      username: req.body.username,
      password: req.body.password,
      idGroupUser: req.body.idGroupUser,
      idInfoUser: req.body.idInfoUser,
      trash: req.body.trash,
    };
    models.user.create(newUser, (err, data) => {
      if (!err) {
        res.json({status: 1});
      } else {
        res.json({
          status: 0,
          err: 'err'
        });
      }
    })
  }
}