"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose'),
    user = require('./user'),
    area = require('./area'),
    groupUser = require('./groupUser'),
    permission = require('./permission'),
    node = require('./node'),
    deviceType = require('./deviceType'),
    dataSensor = require('./dataSensor'),
    deviceNode = require('./deviceNode'),
    actuator = require('./actuator'),
    functionn = require('./function'),
    groupExcutionCondition = require('./groupExcutionCondition'),
    historyAction = require('./historyAction');

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
  router.get('/getNodeByIdArea/:idArea', node.getNodeByIdArea);

  router.post('/addDeviceType', deviceType.addDeviceType);
  router.get('/getAllDeviceTypes', deviceType.getAllDeviceTypes);
  router.get('/getDeviceType/:id', deviceType.getDeviceType);
  router.put('/updateDeviceType', deviceType.updateDeviceType);
  router.delete('/deleteDeviceType', deviceType.deleteDeviceType);

  router.get('/getDataSensor/:id', dataSensor.getDataSensor);
  router.post('/addDataSensor', dataSensor.addDataSensor);
  router.delete('/deleteDataSensor/:id', dataSensor.deleteDataSensor);
  router.get('/getChartByHours/:date', dataSensor.getChartByHours); // getChartByHours{timestamp}
  router.get('/getChartByDays', dataSensor.getChartByDays); // getChartByDays?from={timestamp}&to={timestamp}

  router.get('/getAllDeviceNodes', deviceNode.getAllDeviceNodes);
  router.get('/getDeviceNode/:id', deviceNode.getDeviceNode);
  router.get('/getDeviceNodeByNode/:nodeId', deviceNode.getDeviceNodeByNode);
  router.post('/addDeviceNode', deviceNode.addDeviceNode);
  router.put('/updateDeviceNode', deviceNode.updateDeviceNode);
  router.delete('/deleteDeviceNode/:id', deviceNode.deleteDeviceNode);
  

  router.post('/addActuator', actuator.addActuator);
  router.put('/updateActuator', actuator.updateActuator);
  router.delete('/deleteActuator/:id', actuator.deleteActuator);
  router.get('/getActuatorByIdArea/:idArea', actuator.getActuatorByIdArea);

  router.get('/getFunctions', functionn.getFunctions);
  router.get('/getFunction/:id', functionn.getFunction);
  router.post('/addFunction', functionn.addFunction);
  router.put('/updateFunction', functionn.updateFunction);
  router.delete('/deleteFunction/:id', functionn.deleteFunction);

  router.get('/getGroupExcutionConditions', groupExcutionCondition.getGroupExcutionConditions);
  router.get('/getGroupExcutionCondition/:id', groupExcutionCondition.getGroupExcutionCondition);
  router.post('/addGroupExcutionCondition', groupExcutionCondition.addGroupExcutionCondition);
  router.put('/updateGroupExcutionCondition', groupExcutionCondition.updateGroupExcutionCondition);
  router.delete('/deleteGroupExcutionCondition/:id', groupExcutionCondition.deleteGroupExcutionCondition);

  router.get('/getHistoryActions', historyAction.getHistoryActions);
  router.get('/getHistoryAction/:id', historyAction.getHistoryAction);
  router.post('/addHistoryAction', historyAction.addHistoryAction);
  router.put('/updateHistoryAction', historyAction.updateHistoryAction);
  router.delete('/deleteHistoryAction/:id', historyAction.deleteHistoryAction);
}