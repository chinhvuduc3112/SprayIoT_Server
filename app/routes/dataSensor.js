"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose');

module.exports = {

  getDataSensor: (req,res) => {
    var _id = req.params.id;
    models.dataSensor.findById(_id, (err, data) => {
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

  deleteDataSensor: (req, res) => {
    var _id = req.params.id;
    models.dataSensor.remove({_id: _id}, (err, data) => {
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