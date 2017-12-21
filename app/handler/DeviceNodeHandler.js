var models = require('../models/models'),
    DataSensorHandler = require('./DataSensorHandler'), 
    ExecConditonHandler = require('./ExecConditionHandler'),
    ActuatorHandler = require('./ActuatorHandler'),
    FunctionHandler = require('./FunctionHandler')

module.exports = {

    updateDeviceNode: async (datas) => {
        let len = datas.length;
        let returnObj = {};
        let funcObj = {};
        for (let t = 0; t < len; t++) {
            let data = datas[t];
            let deviceNodeName = data.deviceNodeName;
            let deviceNode = await models.deviceNode.findOneAndUpdate(
                {name: deviceNodeName}, {
                $set: {
                    data: data.data
                }
            });
            
            if (deviceNode != null) {
                data.deviceNodeId = deviceNode._id;
                await DataSensorHandler.addDataSensor(data);
                let compare = await ExecConditonHandler.updateExecutionConditionCompare(deviceNode._id, parseFloat(data.data));
                if (compare === true) {
                    let groupCondis = await ExecConditonHandler.getGroupConditionByDeviceNodeId(deviceNode._id);
                    for (let i = 0; i < groupCondis.length; i++) {
                        let groupCondi = groupCondis[i];
                        let groupCondiId = groupCondi._id;
                        let statusGroup = await ExecConditonHandler.getStatusGroupCondition(groupCondiId);
                        if (statusGroup) {
                            let execFunction = await FunctionHandler.getFunctionById(groupCondi.functionId);
                            if (funcObj[execFunction._id] == null ||  funcObj[execFunction._id] == undefined) {
                                funcObj[execFunction._id] = [groupCondi];
                            } else {
                                funcObj[execFunction._id].push(groupCondi);
                            }
                        }
                    }
                }
            } else {
                throw new Error('Error occur');
            }
        }
        let objs = {};
        let returnArr = [];
        let funcObjKeys = Object.keys(funcObj);
        let funcObjLength = funcObjKeys.length;
        for (let i = 0; i < funcObjLength; i++) {
            let groupCondis = funcObj[funcObjKeys[i]];
            let statusGroup = true;
            let maxAutoTime = 0;
            for (let j = 0; j < groupCondis.length; j++) {
                let groupCondi = groupCondis[j];
                if (groupCondi.status) {
                    if (maxAutoTime < groupCondi.autoTime) {
                        maxAutoTime = groupCondi.autoTime;
                    }
                } else {
                    statusGroup = false;
                }
                
            }
            let execFunction = await FunctionHandler.findAndUpdateById(funcObjKeys[i], statusGroup);
            if (statusGroup) {
                await FunctionHandler.updateDurationById(funcObjKeys[i], maxAutoTime);
            }
            let actuator = await ActuatorHandler.findAndUpdateActuatorById(execFunction.actuatorId, statusGroup);
            let obj = {
                _id: actuator._id,
                name: actuator.name,
                time: actuator.time,
                status: actuator.status
            };
            objs[actuator._id] = obj;
        }
        let keys = Object.keys(objs);
        for (let i = 0; i < keys.length; i++) {
            let functions =  await FunctionHandler.getFunctionByActuatorId(keys[i]);
            objs[keys[i]].functions = functions;
            await returnArr.push(objs[keys[i]]);
        }
        for (let i = 0; i < returnArr.length; i++) {
            returnObj[returnArr[i]._id] = returnArr[i];
        }


        let objKeys = Object.keys(returnObj);
        let retArr = [];
        for (let i = 0; i < objKeys.length; i++) {
            retArr.push(returnObj[objKeys[i]]);
        }
        return retArr;
    }
}