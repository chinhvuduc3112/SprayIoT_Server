"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose');

module.exports = {

  addDeviceType: (req, res) => {
    var name = req.body.name;
    var note = req.body.note;
    models.deviceType.create({
      name: name,
      note: note
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

  getAllDeviceTypes: (req, res) => {
    models.deviceType.find({}, (err, data) => {
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

  getDeviceType: (req, res) => {
    var _id = req.params.id;
    models.deviceType.findById(_id, (err, data) => {
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

  updateDeviceType: (req, res) => {
    var name = req.body.name;
    var note = req.body.note;
    var _id = req.body._id;
    var trash = req.body.trash;
    models.deviceType.update({
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

  deleteDeviceType: (req, res) => {
    var _id = req.params.id;
    models.deviceType.remove({_id: _id}, (err, data) => {
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