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
  };

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
    var name = req.body.name;
    var description = req.body.description;
    var deviceTypeId = req.body.deviceTypeId;
    var nodeId = req.body.nodeId;
    var note = req.body.note;
    var trash = req.body.trash;
    models.deviceNode.update({
      _id: _id
    }, {
      $set: {
        name: name,
        description: description,
        deviceTypeId: deviceTypeId,
        nodeId: nodeId,
        note: note
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
  }
}