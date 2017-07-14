"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose');

module.exports = {

  addGroupUser: (req, res) => {
    var name = req.body.name;
    var note = req.body.note;
    models.groupUser.create({
      name: name,
      note: note
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

  updateGroupUser: (req, res) => {
    var _id = req.body._id;
    var name = req.body.name;
    var note = req.body.note;
    var trash = req.body.trash;
    models.groupUser.update({
      _id: _id
    }, {
      $set: {
        name: name,
        note: note,
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

  deleteGroupUser: (req, res) => {
    var _id = req.params.id;
    models.groupUser.remove({_id: _id}, (err, data) => {
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