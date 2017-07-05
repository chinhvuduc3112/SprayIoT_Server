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
        res.json({
          status: 0,
          err: 'err'
        });
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
        res.json({
          status: 0,
          err: err
        });
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
          status: 0,
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
          status: 0,
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
          status: 0,
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
          status: 0,
          err: err
        });
      }
    });
  });

  router.post('/addGroupUser', (req, res) => {
    var name = req.body.name;
    var note = req.body.note;
    models.groupUser.create({
      name: name,
      note: note
    }, (err, data) => {
      if (!err) {
        res.json({
          status: 1,
          result: 1
        });
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  });

  router.put('/updateGroupUser', (req, res) => {
    var _id = req.body._id;
    var name = req.body.name;
    var note = req.body.note;
    var trash = req.body.trash;
    models.groupUser.update({
      _id: _id
    }, {
      $set: {
        name: name,
        note: note,
        trash: trash
      }
    }, (err, data) => {
      if (!err) {
        res.json({
          status: 1,
          result: 1
        });
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  });

  router.delete('/deleteGroupUser/:id', (req, res) => {
    var _id = req.params.id;
    models.groupUser.remove({_id: _id}, (err, data) => {
      if (!err) {
        res.json({
          status: 1
        });
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  });

  router.get('/getAllPermissions', (req, res) => {
    models.permission.find({}, (err, data) => {
      if (!err) {
        res.json({
          status: 1,
          result: data
        });
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  });

  router.get('/getPermission/:id', (req, res) => {
    var _id = req.params.id;
    models.permission.findById(_id, (err, data) => {
      if (!err) {
        res.json({
          result: data,
          status: 1
        })
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  })

  router.post('/addPermission', (req, res) => {
    var idGroupUser = req.body.idGroupUser;
    var menu = req.body.menu;
    var codelink = req.body.codelink;
    var action = req.body.action;
    models.permission.create({
      idGroupUser: idGroupUser,
      menu: menu,
      codelink: codelink,
      action: action
    }, (err, data) => {
      if (!err) {
        res.json({
          status: 1,
        });
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  });

  router.put('/updatePermission', (req, res) => {
    var _id = req.body._id;
    var idGroupUser = req.body.idGroupUser;
    var menu = req.body.menu;
    var codelink = req.body.codelink;
    var action = req.body.action;
    var trash = req.body.trash;
    models.permission.update({
      _id: _id
    }, {
      $set: {
        idGroupUser: idGroupUser,
        menu: menu,
        codelink: codelink,
        action: action,
        trash: trash
      }
    }, (err, data) => {
      if (!err) {
        res.json({
          status: 1,
          result: 1
        });
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  });

  router.delete('/deletePermission/:id', (req, res) => {
    var _id = req.params.id;
    models.permission.remove({_id: _id}, (err, data) => {
      if (!err) {
        res.json({
          status: 1
        });
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  });

  router.get('/getAllNodes', (req, res) => {
    models.node.find({}, (err, data) => {
      if (!err) {
        res.json({
          status: 1,
          result: data
        });
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  });

  router.get('/getNode/:id', (req, res) => {
    var _id = req.params.id;
    models.node.findById(_id, (err, data) => {
      if (!err) {
        res.json({
          result: data,
          status: 1
        })
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  });

  router.post('/addNode', (req, res) => {
    var name = req.body.name;
    var description = req.body.description;
    var idArea = req.body.idArea;
    var note = req.body.note;
    models.node.create({
      name: name,
      description: description,
      idArea: idArea,
      note: note
    }, (err, data) => {
      if (!err) {
        res.json({
          status: 1,
        });
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  });

  router.put('/updateNode', (req, res) => {
    var name = req.body.name;
    var description = req.body.description;
    var idArea = req.body.idArea;
    var note = req.body.note;
    var _id = req.body._id;
    var trash = req.body.trash;
    models.node.update({
      _id: _id
    }, {
      $set: {
        name: name,
        description: description,
        idArea: idArea,
        note: note,
        trash: trash
      }
    }, (err, data) => {
      if (!err) {
        res.json({
          status: 1,
          result: 1
        });
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  })

  router.delete('/deleteNode/:id', (req, res) => {
    var _id = req.params.id;
    models.node.remove({_id: _id}, (err, data) => {
      if (!err) {
        res.json({
          status: 1
        });
      } else {
        res.json({
          status: 0,
          err: err
        });
      }
    });
  })
}