var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
var userModel = require('../models/Users');
var postModel = require('../models/Posts');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/someUrl', auth, function (req, res, next) {

    postModel.Post.find(function (err, posts) {
        if (err) {
            return next(err);
        }

        res.json(posts);
    });


});


router.post('/users', function (req, res, next) {
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

router.get('/users', auth, function (req, res, next) {
    userModel.User.find(function (err, users) {
        if (err) {
            return next(err);
        }

        res.json(users);
    });
});


router.post('/logins', function (req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }

        if (user) {
            return res.json({token: user.generateJWT()});
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

module.exports = router;
