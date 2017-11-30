
var models = require('../models/models');

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
    }
}