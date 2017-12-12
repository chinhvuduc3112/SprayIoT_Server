var models = require('../models/models'),
    ActuatorHandler = require('./ActuatorHandler');

module.exports = {

    getFunctionById: (functionId) => {
        return models.function.findById(functionId);
    },

    getFunctionByActuatorId: (actuatorId) => {
        return models.function.find({
            actuatorId: actuatorId
        });
    },

    findAndUpdateById: async (functionId, status) => {
        await models.function.update({
            _id: functionId
        }, {
            $set: {
                status: status,
            }
        });
        return models.function.findOne({
            _id: functionId
        });
    },

    getFunctionMaxDuration: async (actuatorId) => {
        return models.function.find({actuatorId: actuatorId, status: true}).sort('-time').limit(1).exec();
    },

    getFunctionMaxManualTime: async (actuatorId) => {
        return models.function.find({actuatorId: actuatorId, status: true}).sort('-manualTime').limit(1).exec();
    },

    

    updateDurationById: (id, duration) => {
        return models.function.update({
            _id: id
        }, {
            $set: {
                activityDuration: duration
            }
        });
    },

    updateStatusAndTimeByActuatorId: (actuatorId, status, time) => {
        
        return models.function.update({
            actuatorId: actuatorId
        }, {
            $set: {
                status: status,
                manualTime: time
            }
        }, {
            multi: true
        });
    },

    manualUpdateStatusById: async (id, status, time) => {
        let updateFunc = await models.function.update({
            _id: id
        }, {
            $set: {
                status: status,
                manualTime: time
            }
        });
        let thisFunc = await models.function.findById(id);
        // let a = await ActuatorHandler.findAndManualUpdateActuatorById(thisFunc.actuatorId, 1);
        return thisFunc;
    }
}