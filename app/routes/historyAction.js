"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose');

module.exports = {
  addHistoryAction: (req, res) => {
    var name = req.body.name;
    var userId = req.body.userId;
    var functionId = req.body.functionId;
    models.historyAction.create({
      name: name,
      userId: userId,
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

  getHistoryActions: (req, res) => {
    models.historyAction.find({}, (err, data) => {
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

  getHistoryAction: (req, res) => {
    var _id = req.params.id;
    models.historyAction.findById(_id, (err, data) => {
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

  updateHistoryAction: (req, res) => {
    var _id = req.body._id;
    var name = req.body.name;
    var userId = req.body.userId;
    var functionId = req.body.functionId;
    var trash = req.body.trash;
    models.historyAction.update({_id: _id}, {
      $set: {
        name: name,
        userId: userId,
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

  deleteHistoryAction: (req, res) => {
    var _id = req.params.id;
    models.historyAction.remove({_id: _id}, (err, data) => {
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