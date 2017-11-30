var models = require('../models/models'),
    DataSensorHandler = require('./DataSensorHandler'), 
    ExecConditonHandler = require('./ExecConditionHandler'),
    ActuatorHandler = require('./ActuatorHandler'),
    FunctionHandler = require('./FunctionHandler')

module.exports = {

    updateDeviceNode: async (deviceNodeName, data) => {
        
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
                let objs = {};
                let returnObj = [];
                let groupCondis = await ExecConditonHandler.getGroupConditionByDeviceNodeId(deviceNode._id);
                for (let i = 0; i < groupCondis.length; i++) {
                    let groupCondi = groupCondis[i];
                    let groupCondiId = groupCondi._id;
                    let statusGroup = await ExecConditonHandler.getStatusGroupCondition(groupCondiId);
                    let execFunction = await FunctionHandler.findAndUpdateById(groupCondi.functionId, statusGroup);
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
                    await returnObj.push(objs[keys[i]]);
                }
                return returnObj;
            }
        } else {
            throw new Error('Error occur');
        }
    }
}