var mongoose = require('mongoose');

var PoiSchema = new mongoose.Schema({
    name: {type: String, required:true},
    coordinates: {type: String, required:true},
    type: {type: String, required:true},
    description: String,
    workTime: String,
    rating: Number,

    priceCategory: String,
    seatsCount: String,
    additionalInformation: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

exports.Poi = mongoose.model('Poi', PoiSchema);