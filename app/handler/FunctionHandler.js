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
        let func = await models.function.findById(functionId);
        if (status && !func.status) {
            await models.historyAction.create({
                functionId: functionId,
                userId: null,
                timer: func.activityDuration
            });
        } else if (!status && func.status) {
            let historyAction = await models.historyAction.find({
                functionId: functionId,
                timer: 0
            });
            historyAction = (historyAction[0] != null && historyAction[0] != undefined) ? historyAction[0] : null;
            if (historyAction != null) {
                let start = new Date(historyAction.timeStart).getTime();
                let endTime = (new Date()).getTime();
                let duration = (endTime - start) / 60000;
                models.historyAction.update({
                    functionId: functionId,
                    timer: 0
                }, {
                    $set: {
                        timer: duration
                    }
                });
            }
        }
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
        return models.function.find({actuatorId: actuatorId, status: true}).sort('-activityDuration').limit(1).exec();
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

    updateStatusAndTimeByActuatorId: async (actuatorId, status, time) => {
        let funcs = await models.function.find({
            actuatorId: actuatorId
        });
        for (let i = 0; i < funcs.length; i++) {
            let func = funcs[0];
            if (status && !func.status) {
                await models.historyAction.create({
                    functionId: func._id,
                    userId: null,
                });
            } else if (!status && func.status) {
                let historyAction = await models.historyAction.find({
                    functionId: func._id,
                    timer: 0
                });
                historyAction = (historyAction[0] != null && historyAction[0] != undefined) ? historyAction[0] : null;
                if (historyAction != null) {
                    let start = new Date(historyAction.timeStart).getTime();
                    let endTime = (new Date()).getTime();
                    let duration = (endTime - start) / 60000;
                    await models.historyAction.update({
                        functionId: func._id,
                        timer: 0
                    }, {
                        $set: {
                            timer: duration
                        }
                    });
                }
            }
        }
        return models.function.update({
            actuatorId: actuatorId
        }, {
            $set: {
                status: status,
                activityDuration: time
            }
        }, {
            multi: true
        });
    },

    manualUpdateStatusById: async (id, status, time) => {
        let func = await models.function.findById(id);
        if (status && !func.status) {
            await models.historyAction.create({
                functionId: id,
                userId: null,
            });
        } else if (!status && func.status) {
            let historyAction = await models.historyAction.find({
                functionId: id,
                timer: 0
            });
            historyAction = (historyAction[0] != null && historyAction[0] != undefined) ? historyAction[0] : null;
            if (historyAction != null) {
                let start = new Date(historyAction.timeStart).getTime() / 1000;
                let endTime = (new Date()).getTime() / 1000;
                let duration = (endTime - start) / 60;
                await models.historyAction.update({
                    functionId: id,
                    timer: 0
                }, {
                    $set: {
                        timer: duration
                    }
                });
            }
        }
        let updateFunc = await models.function.update({
            _id: id
        }, {
            $set: {
                status: status,
                activityDuration: time
            }
        });
        let thisFunc = await models.function.findById(id);
        // let a = await ActuatorHandler.findAndManualUpdateActuatorById(thisFunc.actuatorId, 1);
        return thisFunc;
    }
}