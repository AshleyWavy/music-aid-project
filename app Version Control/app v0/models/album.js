
var mongoose = require('mongoose');

var albumSchema = new mongoose.Schema({
    album: String,
    artist: String,
    _id: String,
//    length: String,
  //  name: String,
//    preview: String,
   type: String
});

module.exports = mongoose.model('Album', albumSchema);