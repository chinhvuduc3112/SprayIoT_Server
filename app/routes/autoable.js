var models = require('../models/models'),
    mongoose = require('mongoose'),
    AutoableHandler = require('../handler/AutoableHandler')


module.exports = {

    setAutoable: async (req, res) => {
        let able = req.body.able;
        AutoableHandler.setAutoable(able).then(data => {
            res.json({status: 1});
        }).catch (e => {
            res.json({
                status: 0,
                err: err
            });
        });
    }

}