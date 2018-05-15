
var mongoose = require('mongoose');

var artistSchema = new mongoose.Schema({
    _id: String,
    name: String,
    images: Object,
    genre: Object,
//    length: String,
  //  name: String,
//    preview: String,
   type: String
});

module.exports = mongoose.model('Artist', artistSchema);