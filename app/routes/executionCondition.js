"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose');

module.exports = {
    addExecutionCondition: (req, res) => {
        var name = req.body.name;
        var description = req.body.description;
        var groupExecutionConditionId = req.body.groupExecutionConditionId;
        var deviceNodeId = req.body.deviceNodeId;
        var compare = req.body.compare;
        var compareValue = req.body.compareValue;
        models.executionCondition.create({
            name: name,
            description: description,
            groupExecutionConditionId: groupExecutionConditionId,
            deviceNodeId: deviceNodeId,
            compare: compare,
            compareValue: compareValue
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

    updateExecutionCondition: (req, res) => {
        var name = req.body.name;
        var description = req.body.description;
        var groupExecutionConditionId = req.body.groupExecutionConditionId;
        var deviceNodeId = req.body.deviceNodeId;
        var _id = req.body._id;
        var trash = req.body.trash;
        models.executionCondition.update({
            _id: _id
        }, {
                $set: {
                    name: name,
                    description: description,
                    groupExecutionConditionId: groupExecutionConditionId,
                    deviceNodeId: deviceNodeId,
                    trash: trash
                }
            }, (err, data) => {
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

    updateCompareExcutionCondition: (req, res) => {
        var compare = req.body.compare;
        var compareValue = req.body.compareValue;
        var _id = req.body._id;
        models.executionCondition.update({
            _id: _id
        }, {
                $set: {
                    compare: compare,
                    compareValue: compareValue
                }
            }, (err, data) => {
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

    getAllExecutionCondition: (req, res) => {
        models.executionCondition.find({}, (err, data) => {
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

    getExecutionCondition: (req, res) => {
        var _id = req.params.id;
        models.executionCondition.findById(_id, (err, data) => {
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

    deleteExcutionCondition: (req, res) => {
        var _id = req.params.id;
        models.executionCondition.remove({ _id: _id }, (err, data) => {
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