'use strict'
var models = require('../models/models');

module.exports = {
  getAreas: (callback) => {
    models.area.find({}, callback);
  },

  // Area
  getArea: (_id, callback) => {
    models.area.findById(_id, callback);
  },

  addArea: (name, note, x, y, trash, callback) => {
    models.area.create({
      name: name,
      note: note,
      x: x,
      y: y,
      trash: false
    }, callback);
  },

  updateArea: (_id, name, note, x, y, trash, callback) => {
    models.area.update({ _id: _id }, {
      $set: {
        name: name,
        note: note,
        x: x,
        y: y,
        trash: trash
      }
    }, callback);
  },

  deleteArea: (_id, callback) => {
    models.area.remove({ _id: _id }, callback);
  },

  //User
  addUser: (username, password, idGroupUser, idInforUser, trash, callback) => {
    models.user.create({
      username: username,
      password: password,
      idGroupUser: idGroupUser,
      idInfoUser: idInfoUser,
      trash: trash,
    }, callback);
  },

  //GropUser
  addGroupUser: (name, note, callback) => {
    models.groupUser.create({
      name: name,
      note: note
    }, callback);
  },

  updateGroupUser: (_id, name, note, trash, callback) => {
    models.groupUser.update({
      _id: _id
    }, {
        $set: {
          name: name,
          note: note,
          trash: trash
        }
      }, callback);
  },

  deleteGroupUser: (_id, callback) => {
    models.groupUser.remove({ _id: _id }, callback);
  },

  //Permission
  getAllPermissions: (callback) => {
    models.permission.find({}, callback);
  },

  getPermission: (_id, callback) => {
    models.permission.findById(_id, callback);
  },

  addPermission: (idGroupUser, menu, codelink, action, callback) => {
    models.permission.create({
      idGroupUser: idGroupUser,
      menu: menu,
      codelink: codelink,
      action: action
    }, callback);
  },

  updatePermission: (_id, idGroupUser, menu, codelink, action, trash, callback) => {
    models.permission.update({
      _id: _id
    }, {
        $set: {
          idGroupUser: idGroupUser,
          menu: menu,
          codelink: codelink,
          action: action,
          trash: trash
        }
      }, callback);
  },

  deletePermission: (_id, callback) => {
    models.permission.remove({ _id: _id }, callback);
  },

  //Node
  getAllNodes: (callback) => {
    models.node.find({}, callback);
  },

  getNode: (_id, callback) => {
    models.node.findById(_id, callback);
  },

  addNode: (name, description, idArea, node, callback) => {
    models.node.create({
      name: name,
      description: description,
      idArea: idArea,
      note: note
    }, callback);
  },

  updateNode: (name, description, idArea, note, _id, trash, callback)=>{
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
    }, callback);
  },

  deleteNode: (_id, callback)=>{
    models.node.remove({_id: _id}, callback);
  }
}