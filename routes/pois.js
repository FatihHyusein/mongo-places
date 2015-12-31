var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
var userModel = require('../models/Users');
var poiModel = require('../models/Pois');
var rm = require('../models/reqDataMapper');


router.post('/', auth, function (req, res, next) {
    if (!req.body.name || !req.body.coordinates || !req.body.type) {
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    var poi = new poiModel.Poi();
    rm.mapReqData.postPoi({model: poi, reqData: req.body, userId: req.payload._id});

    poi.save(function (err, createdPoi) {
        if (err) {
            return next(err);
        }

        return res.json(createdPoi)
    });
});

router.get('/', function (req, res, next) {
    poiModel.Poi.find(function (err, pois) {
        if (err) {
            return next(err);
        }

        res.json(pois);
    });
});

router.get('/:poiId', auth, function (req, res, next) {
    poiModel.Poi.findById(req.params.poiId, function (err, poi) {
        if (err) {
            return next(err);
        }

        res.json(poi);
    });
});

router.put('/:poiId', auth, function (req, res, next) {
    poiModel.Poi.findById(req.params.poiId, function (err, poi) {
        if (err) {
            return next(err);
        }

        if (poi.owner != req.payload._id) {
            res.status(403).send('You can edit only your own POIs.');
        }
        else {
            var updateData = {};
            rm.mapReqData.putPoi({model: updateData, reqData: req.body});

            poi.update(updateData,
                {},
                function (err, poi) {
                    if (err) {
                        return next(err);
                    }

                    res.json(poi);
                });
        }
    });
});

router.delete('/:poiId', auth, function (req, res, next) {
    poiModel.Poi.findById(req.params.poiId, function (err, poi) {
        if (err) {
            return next(err);
        }

        if (poi.owner != req.payload._id) {
            res.status(403).send('You can delete only your own POIs.');
        }
        else {
            poi.remove(
                function (err, poi) {
                    if (err) {
                        return next(err);
                    }

                    res.json(poi);
                });
        }
    });
});

module.exports = router;
