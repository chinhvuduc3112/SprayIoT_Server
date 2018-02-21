"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  login: async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    let user = await models.user.findOne({username: username})
    if (user !== null && user !== void(0)) {
      let compare = bcrypt.compareSync(password, user.password);
      if (compare == true) {
        res.json({
          status: 1,
          result: {
            username: username
          }
        });
      } else {
        res.json({
          status: 0
        });
      }
    } else {
      res.json({
        status: 0
      });
    }
  },

  addUser: async (req, res) => {
    var username = req.body.username;
    var bodyPassword = req.body.password;
    var password = bcrypt.hashSync(bodyPassword, saltRounds);
    var idGroupUser = req.body.idGroupUser;
    var idInfoUser = req.body.idInfoUser;
    var trash = req.body.trash;
    var newUser = {
      username: req.body.username,
      password: password,
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