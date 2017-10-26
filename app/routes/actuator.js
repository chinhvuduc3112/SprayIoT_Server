"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose');

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.1.4')
client.on('connect', function () {
	console.log('abc')
  
  
})

module.exports = {
  addActuator: (req, res) => {
    var name = req.body.name;
    var description = req.body.description;
    var deviceTypeId = req.body.deviceTypeId;
    var idArea = req.body.idArea;
    var time = new Date(parseInt(req.body.time));
    models.actuator.create({
      name: name,
      description: description,
      deviceTypeId: deviceTypeId,
      idArea: idArea,
      time: time,
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
    var name = req.body.name;
    var description = req.body.description;
    var deviceTypeId = req.body.deviceTypeId;
    var idArea = req.body.idArea;
    var time = new Date(parseInt(req.body.time));
    var status = req.body.status || undefined;
    var trash = req.body.trash;
    if (status !== undefined) {
      let packet = {
        _id: _id,
        name: name,
        status: status,
        time: req.body.time
      };
      client.publish('/function', JSON.stringify(packet));
    }
    models.actuator.update({_id: _id}, {
      $set: {
        name: name,
        description: description,
        deviceTypeId: deviceTypeId,
        idArea: idArea,
        time: time,
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

  getActuatorByIdArea: (req, res) => {
    var idArea = req.params.idArea;
    models.actuator.find({idArea: idArea}, (err, data) => {
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