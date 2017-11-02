"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose');

module.exports = {

  getAllDeviceNodes: (req, res) => {
    models.deviceNode.find({}, (err, data) => {
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

  getDeviceNode: (req, res) => {
    var _id = req.params.id;
    models.deviceNode.findById(_id, (err, data) => {
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

  addDeviceNode: (req, res) => {
    var name = req.body.name;
    var description = req.body.description;
    var deviceTypeId = req.body.deviceTypeId;
    var nodeId = req.body.nodeId;
    var note = req.body.note;
    models.deviceNode.create({
      name: name,
      description: description,
      deviceTypeId: deviceTypeId,
      nodeId: nodeId,
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

  updateDeviceNode: (req, res) => {
    var _id = req.body._id;
    models.deviceNode.findOne({_id: _id}, (err, data) => {
      var name = req.body.name || data.name;
      var description = req.body.description || data.description;
      var deviceTypeId = req.body.deviceTypeId || data.deviceTypeId;
      var nodeId = req.body.nodeId || data.nodeId;
      var note = req.body.note || data.note;
      var trash = req.body.trash || data.trash;
      models.deviceNode.update({
        _id: _id
      }, {
        $set: {
          name: name,
          description: description,
          deviceTypeId: deviceTypeId,
          nodeId: nodeId,
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
    });
  },

  deleteDeviceNode: (req, res) => {
    var _id = req.params.id;
    models.deviceNode.remove({_id: _id}, (err, data) => {
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

  getDeviceNodeByNode: (req, res) => {
    var nodeId = req.params.nodeId;
    models.deviceNode.aggregate([
      {
        "$match": {
          nodeId: mongoose.Types.ObjectId(nodeId)
        }
      },
      {
        "$lookup": {
          from: "devicetypes",     
          localField: "deviceTypeId",     
          foreignField: "_id",     
          as: "deviceType" 
        }
      },
      {
        "$project": {
          name: 1,
          description: 1,
          note: 1,
          data: 1,
          trash: 1,
          deviceType: {"$arrayElemAt": ["$deviceType", 0]}
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
    // models.deviceNode.findById({nodeId: nodeId}, (err, data) => {
    //   if (!err) {
    //     res.json({
    //       result: data,
    //       status: 1
    //     })
    //   } else {
    //     res.json({
    //       status: 0,
    //       err: err
    //     });
    //   }
    // });
  },
}

