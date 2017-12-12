var models = require('../models/models'),
    DataSensorHandler = require('./DataSensorHandler'), 
    ExecConditonHandler = require('./ExecConditionHandler'),
    ActuatorHandler = require('./ActuatorHandler'),
    FunctionHandler = require('./FunctionHandler')

module.exports = {

    updateDeviceNode: async (datas) => {
        let len = datas.length;
        let returnObj = {};
        for (let t = 0; t < len; t++) {
            let data = datas[t];
            let deviceNodeName = data.deviceNodeName;
            let deviceNode = await models.deviceNode.findOneAndUpdate(
                {name: deviceNodeName}, {
                $set: {
                    data: data.data
                }
            });
            // console.log(data);
            
            if (deviceNode != null) {
                data.deviceNodeId = deviceNode._id;
                await DataSensorHandler.addDataSensor(data);
                let compare = await ExecConditonHandler.updateExecutionConditionCompare(deviceNode._id, parseFloat(data.data));
                if (compare === true) {
                    let objs = {};
                    let returnArr = [];
                    let groupCondis = await ExecConditonHandler.getGroupConditionByDeviceNodeId(deviceNode._id);
                    for (let i = 0; i < groupCondis.length; i++) {
                        let groupCondi = groupCondis[i];
                        let groupCondiId = groupCondi._id;
                        let statusGroup = await ExecConditonHandler.getStatusGroupCondition(groupCondiId);
                        let execFunction = await FunctionHandler.findAndUpdateById(groupCondi.functionId, statusGroup);
                        if (statusGroup && execFunction.activityDuration < groupCondi.autoTime) {
                            await FunctionHandler.updateDurationById(groupCondi.functionId, groupCondi.autoTime);
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
                }
            } else {
                throw new Error('Error occur');
            }
        }
        let objKeys = Object.keys(returnObj);
        let retArr = [];
        for (let i = 0; i < objKeys.length; i++) {
            retArr.push(returnObj[objKeys[i]]);
        }
        return retArr;
        //

        
    }
}