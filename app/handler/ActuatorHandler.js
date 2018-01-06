var models = require('../models/models'),
    FunctionHandler = require('./FunctionHandler');

module.exports = {

    findAndUpdateActuatorById: async (actuatorId, status) => {
        let functionMaxDuration = await FunctionHandler.getFunctionMaxDuration(actuatorId);
        let activityDuration = functionMaxDuration[0] != null && functionMaxDuration != void(0) ? functionMaxDuration[0].activityDuration : 0; 
        await models.actuator.update({
            _id: actuatorId
        }, {
            $set: {
                status: status,
                time: activityDuration
            }
        });
        return models.actuator.findOne({
            _id: actuatorId
        });
    },

    findAndManualUpdateActuatorById: async (actuatorId, status) => {
        let functionMaxManualTime = await FunctionHandler.getFunctionMaxManualTime(actuatorId);
        let manualTime = functionMaxManualTime[0] != null && functionMaxManualTime != void(0) ? functionMaxManualTime[0].activityDuration : 0; 
        await models.actuator.update({
            _id: actuatorId
        }, {
            $set: {
                status: status,
                time: manualTime
            }
        });
        return models.actuator.findOne({
            _id: actuatorId
        });
    },

    findAndManualUpdateTimeActuatorById: async (actuatorId) => {
        let functionMaxManualTime = await FunctionHandler.getFunctionMaxManualTime(actuatorId);
        let manualTime = functionMaxManualTime[0] != null && functionMaxManualTime != void(0) ? functionMaxManualTime[0].activityDuration : 0; 
        await models.actuator.update({
            _id: actuatorId
        }, {
            $set: {
                status: manualTime == 0 ? false : true,
                time: manualTime
            }
        });
        return models.actuator.findOne({
            _id: actuatorId
        });
    },

    manualUpdateStatusActuator: async (actuatorId, status, time) => {
        await FunctionHandler.updateStatusAndTimeByActuatorId(actuatorId, status, time);
        
        await models.actuator.update({
            _id: actuatorId
        }, {
            $set: {
                status: status,
                time: time
            }
        });

        let actuator = await models.actuator.findById(actuatorId);
        let functions = await FunctionHandler.getFunctionByActuatorId(actuatorId);
        return {
            name: actuator.name,
            id: actuator._id,
            status: actuator.status,
            time: actuator.time,
            functions: functions
        }
    },

    updateTimeActuators: async (actuators) => {
        for (let i = 0; i < actuators.length; i++) {
            let actuator = actuators[i];
            await models.actuator.update({
                _id: actuator._id
            }, {
                $set: {
                    time: actuator.time,
                    status: actuator.status
                }
            });
            let functions = actuator.functions;
            for (let j = 0; j < functions.length; j++) {
                let func = functions[j];
                await models.function.update({
                    _id: func._id
                }, {
                    activityDuration: func.activityDuration,
                    status: func.status
                });
            }
        }
        return 1;
    } 
}