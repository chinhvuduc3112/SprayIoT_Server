"use strict";

var models = require('../models/models'),
  mongoose = require('mongoose'),
  FunctionHandler = require('../handler/FunctionHandler'),
  ActuatorHandler = require('../handler/ActuatorHandler')

module.exports = {
  addFunction: (req, res) => {
    var name = req.body.name;
    var actuatorId = req.body.actuatorId;
    var description = req.body.description;
    models.function.create({
      name: name,
      actuatorId: actuatorId,
      activityDuration: 0,
      manualTime: 0,
      description: description,
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

  getFunctionByActuatorId: (req, res) => {
    var actuatorId = req.params.actuatorId;
    models.function.aggregate(
      [
        {
          $match: {
            actuatorId: mongoose.Types.ObjectId(actuatorId)
          }
        },
        {
          $lookup: {
            from: "actuators",
            localField: "actuatorId",
            foreignField: "_id",
            as: "actuator"
          }
        },
        {
          $project: {
            name: 1,
            description: 1,
            activityDuration: 1,
            manualTime: 1,
            trash: 1,
            status: 1,
            actuator: { $ifNull: [{ "$arrayElemAt": ["$actuator", 0] }, null] },
          }
        }
      ]
    ).then(data => {
      res.json({
        result: data,
        status: 1
      })
    }).catch(e => {
      res.json({
        status: 0,
        err: err
      });
    });
  },

  updateFunction: (req, res) => {
    var _id = req.body._id;
    var name = req.body.name;
    var actuatorId = req.body.actuatorId;
    var status = req.body.status;
    var activityDuration = req.body.activityDuration;
    var manualTime = req.body.manualTime;
    var description = req.body.description;
    var trash = req.body.trash;
    models.function.update({ _id: _id }, {
      $set: {
        name: name,
        actuatorId: actuatorId,
        status: status,
        activityDuration: activityDuration,
        manualTime: manualTime,
        description: description,
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

  updateInfoFunction: (req, res) => {
    var _id = req.body._id;
    var name = req.body.name;
    var actuatorId = req.body.actuatorId;
    var description = req.body.description;
    models.function.update({
      _id: _id
    }, {
        $set: {
          name: name,
          actuatorId: actuatorId,
          description: description
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
    models.function.remove({ _id: _id }, (err, data) => {
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

  manualUpdateFunctionStatusById: async (req, res) => {
    let functionId = req.body.functionId;
    let time = parseInt(req.body.time);
    let status = (req.body.status == 'true');
    let thisFunc = await FunctionHandler.manualUpdateStatusById(functionId, status, time);
    let actuator;
    let functions = await FunctionHandler.getFunctionByActuatorId(thisFunc.actuatorId);
    if (status == true) {
      actuator = await ActuatorHandler.findAndManualUpdateActuatorById(thisFunc.actuatorId, status);
    } else {
      actuator = await ActuatorHandler.findAndManualUpdateTimeActuatorById(thisFunc.actuatorId);
    }
    res.json({
      status: 1,
      result: {
        name: actuator.name,
        id: actuator._id,
        status: actuator.status,
        time: actuator.time,
        functions: functions
      }
    });
  }
}