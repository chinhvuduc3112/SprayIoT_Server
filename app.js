"use strict";

var express = require('express'),
    router = express.Router(),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    PORT = process.env.PORT || 8090,
    mosca    = require('mosca'),
    mqttServ = new mosca.Server({}),
    server = require('http').Server(app),
    DeviceNodeHandler = require('./app/handler/DeviceNodeHandler'),
    ActuatorHandler = require('./app/handler/ActuatorHandler');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/SprayIoT', {
  useMongoClient: true,
  /* other options */
}),

// set up
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(router);


require('./app/routes/routes')(router);

mqttServ.on('clientConnected', function(client) {
  console.log('client connected', client.id);
});

// fired when a message is received
mqttServ.on('published', function(packet, client) {
  // console.log(packet);
  let topic = packet.topic;
  if (topic == '/addDataSensor') {
    let data = JSON.parse(packet.payload.toString());
    
    DeviceNodeHandler.updateDeviceNode(data.Address).then(data => {
      if (data != null) {
        let payload = Buffer.from(JSON.stringify({
          result: data
        }), 'utf8');
        let myPacket = packet;
        myPacket.payload = payload;
        myPacket.topic = '/Subcribe/function';

        mqttServ.publish(myPacket, client);
        
      } else {
        // console.log('null');
      }
    }).catch(e => {
      console.log(e);
    });
  } else if (topic == '/Publish/MBVDT') {
    let data = JSON.parse(packet.payload.toString());
    let actuators = data["May Bom"];
    
    ActuatorHandler.updateTimeActuators(actuators).then(data => {
      console.log('ok');
    }).catch(e => {
      console.log(e);
    })
  }
});

mqttServ.on('ready', () => {
  console.log('MQTT server is listen on port ' + 1883);
});


mqttServ.attachHttpServer(server);

global.mqttServ = mqttServ;

server.listen(PORT, () => {
  console.log('app listen on port ' + PORT);
});