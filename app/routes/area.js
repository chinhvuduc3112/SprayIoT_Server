"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose');

module.exports = {
  addArea: (req, res) => {
    var name = req.body.name;
    var note = req.body.note;
    var x = req.body.x;
    var y = req.body.y;
    var trash = req.body.trash;
    models.area.create({
      name: name,
      note: note,
      x: x,
      y: y,
      trash: false
    }, (err, data) => {
      if (!err) {
        res.json({status: 1});
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  },

  getAreas: (req, res) => {
    models.area.find({}, (err, data) => {
      if (!err) {
        res.json({
          result: data,
          status: 1
        });
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  },

  getArea: (req, res) => {
    var _id = req.params.id;
    models.area.findById(_id, (err, data) => {
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

  updateArea: (req, res) => {
    var _id = req.body._id;
    var name = req.body.name;
    var note = req.body.note;
    var x = req.body.x;
    var y = req.body.y;
    var trash = req.body.trash;
    models.area.update({_id: _id}, {
      $set: {
        name: name,
        note: note,
        x: x,
        y: y
      }
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

  deleteArea: (req, res) => {
    var _id = req.params.id;
    models.area.remove({_id: _id}, (err, data) => {
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
  },
  
}