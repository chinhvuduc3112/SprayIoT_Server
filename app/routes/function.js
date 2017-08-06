"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose');

module.exports = {
  addFunction: (req, res) => {
    var actuatorId = req.body.actuatorId;
    var status = req.body.status;
    var activityDuration = req.body.activityDuration;
    var note = req.body.note;
    var trash = req.body.trash;
    models.function.create({
      actuatorId: actuatorId,
      status: status,
      activityDuration: activityDuration,
      note: note,
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

  getFunctions: (req, res) => {
    models.function.find({}, (err, data) => {
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

  getFunction: (req, res) => {
    var _id = req.params.id;
    models.function.findById(_id, (err, data) => {
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

  updateFunction: (req, res) => {
    var _id = req.body._id;
    var actuatorId = req.body.actuatorId;
    var status = req.body.status;
    var activityDuration = req.body.activityDuration;
    var note = req.body.note;
    var trash = req.body.trash;
    models.function.update({_id: _id}, {
      $set: {
        actuatorId: actuatorId,
        status: status,
        activityDuration: activityDuration,
        note: note,
        trash: false
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

  deleteFunction: (req, res) => {
    var _id = req.params.id;
    models.function.remove({_id: _id}, (err, data) => {
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