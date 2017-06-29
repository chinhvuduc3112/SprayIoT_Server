"use strict";

var models = require('../models/models'),
    mongoose = require('mongoose');

module.exports = (router) => {
  router.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    models.user.findOne({username, password}, (err, user) => {
      if (user !== null) {
        res.json({auth: "ok"});
      } else {
        res.json({auth: "failed"});
      }
    });
  });

  router.post('/addUser', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var idGroupUser = req.body.idGroupUser;
    var idInfoUser = req.body.idInfoUser;
    var trash = req.body.trash;
    var newUser = {
      username: req.body.username,
      password: req.body.password,
      idGroupUser: req.body.idGroupUser,
      idInfoUser: req.body.idInfoUser,
      trash: req.body.trash,
    };
    models.user.create(newUser, (err, data) => {
      if (!err) {
        res.json({status: 1});
      } else {
        res.json({err: 'err'});
      }
    })
  });

  router.post('/addArea', (req, res) => {
    var name = req.body.name;
    var note = req.body.note;
    var x = req.body.x;
    var y = req.body.y;
    var trash = req.body.trash;
    models.area.create({
      name: name,
      note: note,
      x: x,
      y: y,
      trash: false
    }, (err, data) => {
      if (!err) {
        res.json({status: 1});
      } else {
        res.json({err: err});
      }
    });
  });

  router.get('/getAreas', (req, res) => {
    models.area.find({}, (err, data) => {
      if (!err) {
        res.json({
          result: data,
          status: 1
        });
      } else {
        res.json({
          err: err
        });
      }
    });
  });

  router.get('/getArea/:id', (req, res) => {
    var _id = req.params.id;
    models.area.findById(_id, (err, data) => {
      if (!err) {
        res.json({
          result: data,
          status: 1
        })
      } else {
        res.json({
          err: err
        });
      }
    });
  });

  router.put('/updateArea', (req, res) => {
    var _id = req.body._id;
    var name = req.body.name;
    var note = req.body.note;
    var x = req.body.x;
    var y = req.body.y;
    var trash = req.body.trash;
    models.area.update({_id: _id}, {
      $set: {
        name: name,
        note: note,
        x: x,
        y: y
      }
    }, (err, data) => {
      if (!err) {
        res.json({
          status: 1,
        });
      } else {
        res.json({
          err: err
        });
      }
    });
  });

  router.delete('/deleteArea/:id', (req, res) => {
    var _id = req.params.id;
    models.area.remove({_id: _id}, (err, data) => {
      if (!err) {
        res.json({
          status: 1
        });
      } else {
        res.json({
          err: err
        });
      }
    });
  });
}