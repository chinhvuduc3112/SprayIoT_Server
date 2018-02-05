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
    excutionCondition = require('./executionCondition'),
    historyAction = require('./historyAction'),
    autoable = require('./autoable');

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
  router.delete('/deleteDeviceType/:id', deviceType.deleteDeviceType);

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

  router.get('/getActuators', actuator.getActuators);
  router.get('/getActuatorById/:id', actuator.getActuatorById);
  router.get('/getInfoActuators', actuator.getInfoActuators);
  router.post('/addActuator', actuator.addActuator);
  router.put('/updateDataActuator', actuator.updateDataActuator);
  router.put('/updateInfoActuator', actuator.updateInfoActuator);
  router.delete('/deleteActuator/:id', actuator.deleteActuator);
  router.get('/getActuatorByIdArea/:idArea', actuator.getActuatorByIdArea);
  router.put('/manualUpdateStatusActuator', actuator.manualUpdateStatusActuator);

  router.get('/getFunctions', functionn.getFunctions);
  router.get('/getFunction/:id', functionn.getFunction);
  router.get('/getFunctionByActuatorId/:actuatorId', functionn.getFunctionByActuatorId);
  router.post('/addFunction', functionn.addFunction);
  router.put('/updateFunction', functionn.updateFunction);
  router.put('/updateInfoFunction', functionn.updateInfoFunction);
  router.delete('/deleteFunction/:id', functionn.deleteFunction);
  router.put('/manualUpdateFunctionStatusById', functionn.manualUpdateFunctionStatusById);

  router.get('/getGroupExcutionConditions', groupExcutionCondition.getGroupExcutionConditions);
  router.get('/getGroupExcutionCondition/:id', groupExcutionCondition.getGroupExcutionCondition);
  router.get('/getGroupExcutionConditionByFunction/:functionId', groupExcutionCondition.getGroupExcutionConditionByFunction);
  router.post('/addGroupExcutionCondition', groupExcutionCondition.addGroupExcutionCondition);
  router.put('/updateGroupExcutionCondition', groupExcutionCondition.updateGroupExcutionCondition);
  router.delete('/deleteGroupExcutionCondition/:id', groupExcutionCondition.deleteGroupExcutionCondition);

  router.get('/getAllExecutionCondition', excutionCondition.getAllExecutionCondition);
  router.get('/getExecutionCondition/:id', excutionCondition.getExecutionCondition);
  router.get('/getExecutionConditionByGroup/:groupId', excutionCondition.getExecutionConditionByGroup);
  router.post('/addExecutionCondition', excutionCondition.addExecutionCondition);
  router.put('/updateExecutionCondition', excutionCondition.updateExecutionCondition);
  router.put("/updateInfoExecutionCondition", excutionCondition.updateInfoExecutionCondition);
  router.delete('/deleteExcutionCondition/:id', excutionCondition.deleteExcutionCondition);

  router.get('/getHistoryActions', historyAction.getHistoryActions);
  router.get('/getHistoryAction/:id', historyAction.getHistoryAction);
  router.post('/addHistoryAction', historyAction.addHistoryAction);
  router.put('/updateHistoryAction', historyAction.updateHistoryAction);
  router.delete('/deleteHistoryAction/:id', historyAction.deleteHistoryAction);
  router.get('/getByActuatorId', historyAction.getByActuatorId);

  router.post('/setAutoable', autoable.setAutoable);
  router.get('/getAutoable', autoable.getAutoable);
}