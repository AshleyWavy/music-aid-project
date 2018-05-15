/*

Database Scripts

*/

var Track = require('../models/track.js');
var Album = require('../models/album.js');
var Artist = require('../models/artist.js');
var app = require('../../server.js');

exports.addTrack = 

function(req,res){
    console.log(req.body);

new Track({
        album: req.body.item.trackAlbum,
        name: req.body.item.trackName,
        artist: req.body.item.trackArtist,
        _id: req.body.item.trackID,
        length: req.body.item.trackLength,
        preview: req.body.item.trackPreview,
        type: req.body.item.type,
        images: req.body.item.images
    }).save(function(err, doc){
		if(err) res.json(err);
		else    res.send('Successfully inserted!');
});

}



//getCollection
exports.getCollectedTracks = function(req,res)
{
    /*song.find().byName('Jasmine Max').exec(function(err, doc) 
    {
    console.log("ERROR");
    });*/
    var data;
    Track.find().then(function(doc) 
    {
    //res.json(doc);
    console.log(doc);
    data = doc;
    res.send(data);
    });
    
}
exports.getCollectedAlbums = function(req,res)
{
    /*song.find().byName('Jasmine Max').exec(function(err, doc) 
    {
    console.log("ERROR");
    });*/
    var data;
    Album.find().then(function(doc) 
    {
    //res.json(doc);
    console.log(doc);
    data = doc;
    res.send(data);
    });
    
}
exports.getCollectedArtists = function(req,res)
{
    /*song.find().byName('Jasmine Max').exec(function(err, doc) 
    {
    console.log("ERROR");
    });*/
    var data;
    Artist.find().then(function(doc) 
    {
    //res.json(doc);
    console.log(doc);
    data = doc;
    res.send(data);
    });
    
}



exports.addAlbum = 

function(req,res){
console.log(req.body);
    
new Album({
        album: req.body.item.albumName,
        //name: req.body.item.trackName,
        artist: req.body.item.albumArtist,
        _id: req.body.item.albumID,
        //length: req.body.item.trackLength,
        //preview: req.body.item.trackPreview,
        type: req.body.item.type,
        imageUrl: req.body.item.albumImage,
        images:req.body.item.images
    }).save(function(err, doc){
		if(err) res.json(err);
		else    res.send('Successfully inserted!');
});

}

exports.deleteAlbum = 

function(req,res){
console.log(req.body);
  
Album.findByIdAndRemove(req.body.id,  
	   function(err, docs){
		if(err) res.json(err);
		else    res.redirect('/collection/albums');
});


}

exports.deleteTrack = 

function(req,res){
console.log(req.body);
  
Track.findByIdAndRemove(req.body.id,  
	   function(err, docs){
		if(err) res.json(err);
		else    res.redirect('/collection/tracks');
});


}

exports.addArtist = 

function(req,res){
console.log(req.body);
new Artist({
        _id: req.body.item.artistID,
        name: req.body.item.artistName,
        genre: req.body.item.artistGenres,
        images: req.body.item.images,
        type: req.body.item.type
        }).save(function(err, doc){
        if(err) res.json(err);
        else res.send('Successfully inserted!');
        });
/*    
new Artist({
        album: req.body.item.albumName,
        //name: req.body.item.trackName,
        artist: req.body.item.albumArtist,
        _id: req.body.item.albumID,
        //length: req.body.item.trackLength,
        //preview: req.body.item.trackPreview,
        type: req.body.item.type      
    }).save(function(err, doc){
		if(err) res.json(err);
		else    res.send('Successfully inserted!');
});
*/
}