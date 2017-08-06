"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose');

module.exports = {
  addActuator: (req, res) => {
    var name = req.body.name;
    var description = req.body.description;
    var deviceTypeId = req.body.deviceTypeId;
    var areaId = req.body.areaId;
    var deviceParent = req.body.deviceParent;
    var status = req.body.status;
    var trash = req.body.trash;
    models.actuator.create({
      name: name,
      description: description,
      deviceTypeId: deviceTypeId,
      areaId: areaId,
      deviceParent: deviceParent,
      status: status,
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

  updateActuator: (req, res) => {
    var _id = req.body._id;
    var description = req.body.description;
    var deviceTypeId = req.body.deviceTypeId;
    var areaId = req.body.areaId;
    var deviceParent = req.body.deviceParent;
    var status = req.body.status;
    var trash = req.body.trash;
    models.actuator.update({_id: _id}, {
      $set: {
        name: name,
        description: description,
        deviceTypeId: deviceTypeId,
        areaId: areaId,
        deviceParent: deviceParent,
        status: status,
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

  deleteActuator: (req, res) => {
    var _id = req.params.id;
    models.actuator.remove({_id: _id}, (err, data) => {
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