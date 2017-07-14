"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose');

module.exports = {

  getAllPermissions: (req, res) => {
    models.permission.find({}, (err, data) => {
      if (!err) {
        res.json({
          status: 1,
          result: data
        });
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  },

  getPermission: (req, res) => {
    var _id = req.params.id;
    models.permission.findById(_id, (err, data) => {
      if (!err) {
        res.json({
          result: data,
          status: 1
        })
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  },

  addPermission: (req, res) => {
    var idGroupUser = req.body.idGroupUser;
    var menu = req.body.menu;
    var codelink = req.body.codelink;
    var action = req.body.action;
    models.permission.create({
      idGroupUser: idGroupUser,
      menu: menu,
      codelink: codelink,
      action: action
    }, (err, data) => {
      if (!err) {
        res.json({
          status: 1,
        });
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  },

  updatePermission: (req, res) => {
    var _id = req.body._id;
    var idGroupUser = req.body.idGroupUser;
    var menu = req.body.menu;
    var codelink = req.body.codelink;
    var action = req.body.action;
    var trash = req.body.trash;
    models.permission.update({
      _id: _id
    }, {
      $set: {
        idGroupUser: idGroupUser,
        menu: menu,
        codelink: codelink,
        action: action,
        trash: trash
      }
    }, (err, data) => {
      if (!err) {
        res.json({
          status: 1,
          result: 1
        });
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  },

  deletePermission: (req, res) => {
    var _id = req.params.id;
    models.permission.remove({_id: _id}, (err, data) => {
      if (!err) {
        res.json({
          status: 1
        });
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  }
}