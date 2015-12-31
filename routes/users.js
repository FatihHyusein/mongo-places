var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
var userModel = require('../models/Users');
var poiModel = require('../models/Pois');


router.post('/', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new userModel.User();
  user.username = req.body.username;
  user.fullname = req.body.fullname;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function (err) {
    if (err) {
      return next(err);
    }

    return res.json({token: user.generateJWT()})
  });
});

router.get('/', auth, function (req, res, next) {
  userModel.User.find(function (err, users) {
    if (err) {
      return next(err);
    }

    res.json(users);
  });
});

router.get('/:userId', auth, function (req, res, next) {
  userModel.User.findById(req.params.userId, function (err, user) {
    if (err) {
      return next(err);
    }

    res.json(user);
  });
});

router.put('/:userId', auth, function (req, res, next) {
  if (req.params.userId != req.payload._id) {
    res.status(403).send('You can edit only your account.');
  }
  else {
    userModel.User.findByIdAndUpdate(req.params.userId,
        {
          fullname: req.body.fullname,
          email: req.body.email
        }, {},
        function (err, user) {
          if (err) {
            return next(err);
          }

          res.json(user);
        });
  }
});

router.delete('/:userId', auth, function (req, res, next) {
  if (req.params.userId != req.payload._id) {
    res.status(403).send('You can delete only your account.');
  }
  else {
    userModel.User.findByIdAndRemove(req.params.userId,
        function (err) {
          if (err) {
            return next(err);
          }

          res.sendStatus(204);
        });
  }
});

module.exports = router;
