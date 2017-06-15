"use strict";

var express = require('express'),
    router = express.Router(),
    app = express(),
    mongoose = require('mongoose').connect('mongodb://localhost/SprayIoT'),
    bodyParser = require('body-parser'),
    PORT = process.env.PORT || 8090,
    server = require('http').Server(app);

// set up
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(router);

require('./app/routes/routes')(router);

server.listen(PORT, () => {
  console.log('app listen on port ' + PORT);
});