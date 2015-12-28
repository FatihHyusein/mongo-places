var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String
});

exports.Post = mongoose.model('Post', PostSchema);
