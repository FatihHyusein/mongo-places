var mongoose = require('mongoose');

var PoiSchema = new mongoose.Schema({
    name: {type: String, required: true},
    coordinates: {
        type: [Number],
        required: true
    },
    type: {type: String, required: true},
    description: String,
    workTime: [Number],
    rating: Number,

    priceCategory: [Number],
    seatsCount: Number,
    additionalInformation: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

//PoiSchema.pre('save', function (next) {
//
//    next();
//});

PoiSchema.index({coordinates: '2dsphere'});

exports.Poi = mongoose.model('Poi', PoiSchema);