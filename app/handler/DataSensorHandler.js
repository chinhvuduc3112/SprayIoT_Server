var models = require('../models/models');

module.exports = {

    addDataSensor: async (data) => {
		let deviceNodeName = data.deviceNodeName;
        let time = new Date(parseInt(data.time));
        let dataSen = data.data;
        return await models.dataSensor.create({
            deviceNodeId: data.deviceNodeId,
            time: time,
            data: dataSen,
            trash: false,
        })
    }
}