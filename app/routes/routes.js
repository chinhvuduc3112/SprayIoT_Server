"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose'),
    user = require('./user'),
    area = require('./area'),
    groupUser = require('./groupUser'),
    permission = require('./permission'),
    node = require('./node'),
    deviceType = require('./deviceType');

module.exports = (router) => {
  router.post('/login', user.login);
  router.post('/addUser', user.addUser);

  router.post('/addArea', area.addArea);
  router.get('/getAreas', area.getAreas);
  router.get('/getArea/:id', area.getArea);
  router.put('/updateArea', area.updateArea);
  router.delete('/deleteArea/:id', area.deleteArea);

  router.post('/addGroupUser', groupUser.addGroupUser);
  router.put('/updateGroupUser', groupUser.updateGroupUser);
  router.delete('/deleteGroupUser/:id', groupUser.deleteGroupUser);

  router.get('/getAllPermissions', permission.getAllPermissions);
  router.get('/getPermission/:id', permission.getPermission)
  router.post('/addPermission', permission.addPermission);
  router.put('/updatePermission', permission.updatePermission);
  router.delete('/deletePermission/:id', permission.deletePermission);

  router.get('/getAllNodes', node.getAllNodes);
  router.get('/getNode/:id', node.getNode);
  router.post('/addNode', node.addNode);
  router.put('/updateNode', node.updateNode);
  router.delete('/deleteNode/:id', node.deleteNode);

  router.post('/addDeviceType', deviceType.addDeviceType);
  router.get('/getAllDeviceTypes', deviceType.getAllDeviceTypes);
  router.get('/getDeviceType/:id', deviceType.getDeviceType);
  router.put('/updateDeviceType', deviceType.updateDeviceType);
  router.delete('/deleteDeviceType', deviceType.deleteDeviceType);
}