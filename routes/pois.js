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

router.get('/sameType/:typeName', function (req, res, next) {
    poiModel.Poi.
    find({type: req.params.typeName}).
    exec(function (err, pois) {
        if (err) {
            return next(err);
        }
        res.json(pois);
    });
});

router.get('/closest/:coordinates', function (req, res, next) {
    var coordinates = [
        parseInt(req.params.coordinates.substring(0, req.params.coordinates.indexOf(','))),
        parseInt(req.params.coordinates.substring(req.params.coordinates.indexOf(',') + 1, req.params.coordinates.length))
    ];

    poiModel.Poi.find().where('coordinates').near({center: coordinates, spherical: true})
        .limit(6)
        .exec(function (err, pois) {
            if (err) {
                return next(err);
            }
            res.json(pois);
        });
});


router.get('/similar/:priceCategory', function (req, res, next) {
    var priceCategory = [
        parseInt(req.params.priceCategory.substring(0, req.params.priceCategory.indexOf(','))),
        parseInt(req.params.priceCategory.substring(req.params.priceCategory.indexOf(',') + 1, req.params.priceCategory.length))
    ];

    poiModel.Poi.
    find({$and: [{"priceCategory.0": {$gte: priceCategory[0]}}, {"priceCategory.1": {$lte: priceCategory[1]}}]}).
    exec(function (err, pois) {
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

        poi.populate('owner', function (err, p) {
            if (err) {
                return next(err);
            }

            res.json(p);
        });
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
