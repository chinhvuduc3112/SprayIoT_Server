"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose');

module.exports = {
  getAllNodes: (req, res) => {
    models.node.find({}, (err, data) => {
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

  getNode: (req, res) => {
    var _id = req.params.id;
    models.node.findById(_id, (err, data) => {
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

  addNode: (req, res) => {
    var name = req.body.name;
    var description = req.body.description;
    var idArea = req.body.idArea;
    var note = req.body.note;
    models.node.create({
      name: name,
      description: description,
      idArea: idArea,
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

  updateNode: (req, res) => {
    var name = req.body.name;
    var description = req.body.description;
    var idArea = req.body.idArea;
    var note = req.body.note;
    var _id = req.body._id;
    var trash = req.body.trash;
    models.node.update({
      _id: _id
    }, {
      $set: {
        name: name,
        description: description,
        idArea: idArea,
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
  },

  deleteNode: (req, res) => {
    var _id = req.params.id;
    models.node.remove({_id: _id}, (err, data) => {
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