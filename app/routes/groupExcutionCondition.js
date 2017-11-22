"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose');

module.exports = {
  addGroupExcutionCondition: (req, res) => {
    var name = req.body.name;
    var description = req.body.description;
    var functionId = req.body.functionId;
    models.groupExecutionCondition.create({
      name: name,
      description: description,
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

  getGroupExcutionConditions: (req, res) => {
    models.groupExecutionCondition.find({}, (err, data) => {
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

  getGroupExcutionCondition: (req, res) => {
    var _id = req.params.id;
    models.groupExecutionCondition.findById(_id, (err, data) => {
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

  getGroupExcutionConditionByFunction: (req, res) => {
    var functionId = req.params.functionId;
    models.groupExecutionCondition.aggregate([
      {
        $match: {
          functionId: mongoose.Types.ObjectId(functionId)
        }
      },
      {
        $lookup:  {
          from: "functions",
          localField: "functionId",
          foreignField: "_id",
          as: "function"
        }
      },
      {
        $project: {
          name: 1,
          description: 1,
          trash: 1,
          function: {$ifNull: [{ "$arrayElemAt": ["$function", 0] }, null]},
        }
      }
    ]).then(data => {
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

  updateGroupExcutionCondition: (req, res) => {
    var _id = req.body._id;
    var name = req.body.name;
    var description = req.body.description;
    var functionId = req.body.functionId;
    var trash = req.body.trash;
    models.groupExecutionCondition.update({_id: _id}, {
      $set: {
        name: name,
        description: description,
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

  deleteGroupExcutionCondition: (req, res) => {
    var _id = req.params.id;
    models.groupExecutionCondition.remove({_id: _id}, (err, data) => {
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