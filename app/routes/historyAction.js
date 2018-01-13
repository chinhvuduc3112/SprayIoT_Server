"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose'),
    moment = require('moment-timezone'),
    fmt   = "MM/DD/YYYY h:mm:ss A",
    HistoryAction = require('../handler/HistoryActionHandler')

module.exports = {
  addHistoryAction: (req, res) => {
    var name = req.body.name;
    var userId = req.body.userId;
    var functionId = req.body.functionId;
    var june = moment();
    june.tz('Asia/Bangkok')
    june.format(fmt);
    models.historyAction.create({
      name: name,
      userId: userId,
      functionId: functionId,
      trash: false,
      time: june
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

  getByActuatorId: (req, res) => {
    let actuatorId = req.query.actuatorId;
    let date = req.query.date;
    HistoryAction.getByActuatorId(actuatorId, date).then(data => {
      res.json({
        status: 1,
        result: data
      });
    }).catch(e => {
      res.json({
        status: 0,
        err: e
      });
    })
  }
  
}