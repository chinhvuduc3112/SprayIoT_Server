'use strict'
var models = require('../models/models');

module.exports = {
  getAreas: (callback) => {
      models.area.find({}, callback);
  },

  addArea: (name, note, x, y, trash, callback) => {
    models.area.create({
      name: name,
      note: note,
      x: x,
      y: y,
      trash: false
    }, callback);
  }
}