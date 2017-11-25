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

    getExecutionConditionByGroup: (req, res) => {
        var groupId = req.params.groupId;
        models.executionCondition.aggregate([
            {
                $match: {
                    groupExecutionConditionId: mongoose.Types.ObjectId(groupId)
                }
            },
            {
                $lookup: {
                    from: "groupexecutionconditions",
                    localField: "groupExecutionConditionId",
                    foreignField: "_id",
                    as: "group"
                }
            },
            {
                $lookup: {
                    from: "devicenodes",
                    localField: "deviceNodeId",
                    foreignField: "_id",
                    as: "devicenode"
                }
            },
            {
                $project: {
                    name: 1,
                    description: 1,
                    compare: 1,
                    compareValue: 1,
                    trash: 1,
                    groupExecutionCondition: { $ifNull: [{ "$arrayElemAt": ["$group", 0] }, null] },
                    deviceNode: { $ifNull: [{ "$arrayElemAt": ["$devicenode", 0] }, null] },
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