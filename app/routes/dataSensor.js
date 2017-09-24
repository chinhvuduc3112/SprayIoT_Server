"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose');

module.exports = {

  getDataSensor: (req,res) => {
    var _id = req.params.id;
    models.dataSensor.findById(_id, (err, data) => {
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
    var time = new Date(req.body.time);
    var data = req.body.data;
    models.deviceNode.create({
      deviceNodeId: name,
      time: description,
      data: deviceTypeId,
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
    models.dataSensor.remove({_id: _id}, (err, data) => {
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
    let date = new Date(req.params.date);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    getChartByHours(year, month, day).then(data => {
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
    let from = new Date(req.query.from);
    let to = new Date(req.query.to);
    getChartByDays(from, to).then(data => {
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

function getAvgInHour(year, month, day, hour) {
  let start = new Date(year, month, day, hour, 0, 0, 0);
  let end = new Date(year, month, day, hour, 59, 59, 999);
  return models.dataSensor.aggregate([
    {
      $match: {
        time: {$gte: start, $lte: end},
      }
    },
    {
      $project: {
        avgData: {$avg: "$data"}
      }
    }
  ]);
}

function getAvgInDay(day) {
  let year = day.getFullYear();
  let month = day.getMonth();
  let date = day.getDate();
  let start = new Date(year, month, date, 0, 0, 0, 0);
  let end = new Date(year, month, date, 23, 59, 59, 999);
  return models.dataSensor.aggregate([
    {
      $match: {
        time: {$gte: start, $lte: end},
      }
    },
    {
      $project: {
        avgData: {$avg: "$data"}
      }
    }
  ]);
}

async function getChartByHours(year, month, day) {
  let result = [];
  for (let i = 0; i <= 23; i++) {
    result.push(await getAvgInHour(year, month, day, i));
  }
  return result;
}

function getDates (startDate, endDate) {
  return new Promise((resolve, reject) => {
    let dates = [],
        currentDate = startDate,
        addDays = function(days) {
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

async function getChartByDays(from, to) {
  let dates = await getDates(new Date(from), new Date(to));
  let result = {};
  dates.forEach(async (date) => {
    result[date.getTime()] = await getAvgInDay(date);
  });
  return result;
}