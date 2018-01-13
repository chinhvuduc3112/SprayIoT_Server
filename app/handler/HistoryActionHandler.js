var models = require('../models/models'),
    FunctionHandler = require('./FunctionHandler'),
    mongoose = require('mongoose');

module.exports = {

    getByActuatorId: async (actuatorId, dateTimestamp) => {
        let functions = await models.function.find({
            actuatorId: actuatorId
        });
        let arrFuncs = [];
        for (let i = 0; i < functions.length; i++) {
            arrFuncs.push(functions[i]._id);
        };
        let date = new Date(parseInt(dateTimestamp));
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let start = new Date(year, month, day, 0, 0, 0, 0);
        let end = new Date(year, month, day, 23, 59, 59, 999);
        
        // console.log(start.getHours() + " " + start.getMinutes() + " " + start.getSeconds());
        // console.log(end.getHours() + " " + end.getMinutes() + " " + end.getSeconds());
        arrFuncs = await arrFuncs.map((el) => { return mongoose.Types.ObjectId(el) });
        let historyActions = await models.historyAction.aggregate([
            {
                $match: {
                    functionId: {
                        $in: arrFuncs
                    },
                    timeStart: { $gte: start, $lte: end },
                }
            },
            {
                $lookup: {
                    from: "functions",
                    localField: "functionId",
                    foreignField: "_id",
                    as: "function"
                }
            }, 
            {
                $project: {
                    _id: 1,
                    function: {$ifNull: [{$arrayElemAt: ["$function", 0]}, null]},
                    timer: 1,
                    timeStart: 1
                }
            }
        ]);
        return historyActions;
    }
}