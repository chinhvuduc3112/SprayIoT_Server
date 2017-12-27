"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose'),
    ActuatorHandler = require('../handler/ActuatorHandler')


module.exports = {
  getActuators: (req, res) => {
    models.actuator.find({}, (err, data) => {
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

  addActuator: (req, res) => {
    var name = req.body.name;
    var description = req.body.description;
    var deviceTypeId = req.body.deviceTypeId;
    var idArea = req.body.idArea;
    models.actuator.create({
      name: name,
      description: description,
      deviceTypeId: deviceTypeId,
      idArea: idArea != '' ? idArea : null,
      time: 0,
      status: false,
      trash: false
    }, (err, data) => {
      if (!err) {
        res.json({ status: 1 });
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  },

  updateInfoActuator: (req, res) => {
    var _id = req.body._id;
    var name = req.body.name;
    var description = req.body.description;
    var deviceTypeId = req.body.deviceTypeId;
    var idArea = req.body.idArea;
    models.actuator.update({ _id: _id }, {
      $set: {
        name: name,
        description: description,
        deviceTypeId: deviceTypeId,
        idArea: idArea != '' ? idArea : null
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

  updateDataActuator: (req, res) => {
    var _id = req.body._id;
    var name = req.body.name;
    var time = req.body.time;
    var status = req.body.status || undefined;
    if (status !== undefined) {
      console.log(status.toString())
      let packet = {
        _id: _id,
        name: name,
        status: status,
        time: time
      };
      client.publish('/updateDataActuator', JSON.stringify(packet));
    }
    models.actuator.update({ _id: _id }, {
      $set: {
        name: name,
        time: time,
        status: status
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
    models.actuator.remove({ _id: _id }, (err, data) => {
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
    models.actuator.find({ idArea: idArea }, (err, data) => {
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

  getInfoActuators: (req, res) => {
    models.actuator.aggregate([
      {
        "$lookup": {
          from: "devicetypes",
          localField: "deviceTypeId",
          foreignField: "_id",
          as: "deviceType"
        }
      },
      {
        "$lookup": {
          from: "areas",
          localField: "idArea",
          foreignField: "_id",
          as: "area"
        }
      },
      {
        "$project": {
          name: 1,
          description: 1,
          note: 1,
          data: 1,
          status: 1,
          time: 1,
          trash: 1,
          deviceType: { "$arrayElemAt": ["$deviceType", 0] },
          area: { $ifNull: [{ "$arrayElemAt": ["$area", 0] }, null] }
        }
      }
    ], (err, data) => {
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

  manualUpdateStatusActuator: (req, res) => {
    let actuatorId = req.body.actuatorId;
    let status = (req.body.status == 'true');
    let time = parseInt(req.body.time);
    ActuatorHandler.manualUpdateStatusActuator(actuatorId, status, time).then(data => {
      res.json({
        status: 1,
        result: data
      });
      global.mqttServ.publish({
        cmd: 'publish',
        qos: 2,
        topic: '/Subcribe/manualActuator',
        payload: new Buffer(JSON.stringify(data)),
        retain: false
      });
    }).catch(err => {
      res.json({
        status: 0,
        err: err
      });
    })
  },
}