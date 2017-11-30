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
    }
}