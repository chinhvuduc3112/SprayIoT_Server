"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose');

module.exports = {
  addGroupExcutionCondition: (req, res) => {
    var name = req.body.name;
    var note = req.body.note;
    var functionId = req.body.functionId;
    var trash = req.body.trash;
    models.groupExecutionCondition.create({
      name: name,
      note: note,
      functionId: functionId,
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

  getGroupExcutionConditions: (req, res) => {
    models.groupExecutionCondition.find({}, (err, data) => {
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

  getGroupExcutionCondition: (req, res) => {
    var _id = req.params.id;
    models.groupExecutionCondition.findById(_id, (err, data) => {
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

  updateGroupExcutionCondition: (req, res) => {
    var _id = req.body._id;
    var name = req.body.name;
    var note = req.body.note;
    var functionId = req.body.functionId;
    var trash = req.body.trash;
    models.groupExecutionCondition.update({_id: _id}, {
      $set: {
        name: name,
        note: note,
        functionId: functionId,
        trash: trash
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

  deleteGroupExcutionCondition: (req, res) => {
    var _id = req.params.id;
    models.groupExecutionCondition.remove({_id: _id}, (err, data) => {
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