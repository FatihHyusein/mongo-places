var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
var userModel = require('../models/Users');
var poiModel = require('../models/Pois');


router.post('/', function (req, res, next) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    var user = new userModel.User();
    user.email = req.body.email;
    user.fullname = req.body.fullname;

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
        user.populate('favoritePlaces', function (err, userWithPlaces) {
            if (err) {
                return next(err);
            }

            res.json(userWithPlaces);
        });
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


router.put('/addToFavorites/:poiId', auth, function (req, res, next) {
    userModel.User.findById(req.payload._id,
        function (err, user) {
            if (err) {
                return next(err);
            }

            user.favoritePlaces.push(req.params.poiId);
            user.save(function (usr) {
                if (err) {
                    return next(err);
                }
                res.json(usr);
            })
        });
});


router.put('/removeFromFavorites/:poiId', auth, function (req, res, next) {
    userModel.User.findById(req.payload._id,
        function (err, user) {
            if (err) {
                return next(err);
            }

            var poiIdx = user.favoritePlaces.indexOf(req.params.poiId);
            if (poiIdx > -1) {
                user.favoritePlaces.splice(poiIdx, 1);
            }

            user.save(function (err, usr) {
                if (err) {
                    return next(err);
                }

                usr.populate('favoritePlaces', function (err, u) {
                    if (err) {
                        return next(err);
                    }

                    res.json(u);
                });
            })
        });
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
