"use strict";

var models = require('../models/models'),
  mongoose = require('mongoose');

module.exports = {

  getDataSensor: (req, res) => {
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

  addDataSensor: (req, res) => {
    var deviceNodeId = req.body.deviceNodeId;
    var time = new Date(parseInt(req.body.time));
    var data = req.body.data;
    models.dataSensor.create({
      deviceNodeId: deviceNodeId,
      time: time,
      data: data,
      trash: false,
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

  deleteDataSensor: (req, res) => {
    var _id = req.params.id;
    models.dataSensor.remove({ _id: _id }, (err, data) => {
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

  getChartByHours: (req, res) => {
    let date = new Date(parseInt(req.params.date));
    let deviceNodeId = req.query.deviceNodeId;
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    getChartByHours(year, month, day, deviceNodeId).then(data => {
      res.json({
        status: 1,
        result: data
      });
    }).catch(e => {
      res.json({
        status: 0,
        err: e
      });
    })
  },

  getChartByDays: (req, res) => {
    let from = new Date(parseInt(req.query.from));
    let to = new Date(parseInt(req.query.to));
    let deviceNodeId = new mongoose.Types.ObjectId(req.query.deviceNodeId);
    getChartByDays(from, to, deviceNodeId).then(data => {
      res.json({
        status: 1,
        result: data
      });
    }).catch(e => {
      res.json({
        status: 0,
        err: e
      });
    });
  }
}

function getAvgInHour(year, month, day, hour, deviceNodeId) {
  let start = new Date(year, month, day, hour, 0, 0, 0);
  let end = new Date(year, month, day, hour, 59, 59, 999);
  return models.dataSensor.aggregate([
    {
      $match: {
        time: { $gte: start, $lte: end },
        deviceNodeId: new mongoose.Types.ObjectId(deviceNodeId)
      }
    },
    {
      $group: {
        _id: "$deviceNodeId",
        avgData: { $avg: "$data" }
      }
    }
  ]);
}

function getAvgInDay(day, deviceNodeId) {
  let year = day.getFullYear();
  let month = day.getMonth();
  let date = day.getDate();
  let start = new Date(year, month, date, 0, 0, 0, 0);
  let end = new Date(year, month, date, 23, 59, 59, 999);
  return models.dataSensor.aggregate([
    {
      $match: {
        time: { $gte: start, $lte: end },
        deviceNodeId: new mongoose.Types.ObjectId(deviceNodeId)
      }
    },
    {
      $group: {
        _id: "$deviceNodeId",
        // deviceNodeId: new mongoose.Types.ObjectId(deviceNodeId),
        avgData: { $avg: "$data" }
      }
    }
  ]);
}

async function getChartByHours(year, month, day, deviceNodeId) {
  let result = [];
  for (let i = 0; i <= 23; i++) {
    let x = await getAvgInHour(year, month, day, i, deviceNodeId);
    let a = {
      _id: x[0] !== undefined ? x[0]._id : null,
      avgData: x[0] !== undefined ? x[0].avgData : -1,
    };
    result.push(a);
  }
  return result;
}

function getDates(startDate, endDate) {
  return new Promise((resolve, reject) => {
    let dates = [],
      currentDate = startDate,
      addDays = function (days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    resolve(dates);
  })

};

async function getChartByDays(from, to, deviceNodeId) {
  let dates = await getDates(new Date(from), new Date(to));
  let result = [];
  for (let i = 0; i < dates.length; i++) {
    let data = await getAvgInDay(dates[i], deviceNodeId);
    result.push({
      date: dates[i].getTime(),
      avgData: data[0] !== undefined ? data[0].avgData : -1,
    })
  }
  return result;
}