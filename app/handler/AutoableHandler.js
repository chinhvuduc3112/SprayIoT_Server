var models = require('../models/models');

module.exports = {

    getAutoable: async () => {
        let auto = await models.autoable.findOne({});
        if (auto == null || auto == undefined) {
            auto = await models.autoable.create({
            });
        }
        return auto;
    },

    setAutoable: async(able) => {
        return models.autoable.update({}, {
            $set: {
                able: able
            }
        });
    }

}