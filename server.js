"use strict";

var express = require('express');
var app = express();
var path = require('path'); 
var bodyParser = require('body-parser');
var Spotify = require('node-spotify-api');
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" })); //?


//static directory
app.use(express.static("app/public"));

app.listen(8080);

module.exports = app;

var spotify = new Spotify({
  id: '8556fac6382e427db8d7bc79875d6652',
  secret: '628c8ac0b1504dd6bead6f6f2f9ab459'
});

/*

MONGODB

*/
//1.Connect 
mongoose.connect('mongodb://localhost/Collection');

require('./app/routes/html-routes.js')(app);




app.post('/albums', function(req,res){
		    console.log(req.body);        
            var clientQuery = req.body.albumName;
            
           spotify.search({ type: 'album', query: clientQuery}, function(err, data) {
                if ( err ) 
                {
                console.log('Error occurred: ' + err);
                return;
                }
                var myArray = [];
                //try to interpret this for-loop
                var items = data.albums.items;
                for (var i = 0; i<items.length; i++)
                {
                    var item = items[i];

                    var artists = item.artists;
                    
                    var specificAlbumData = {
                        albumID: item.id,
                        albumName: item.name,
                        albumArtist: item.artists[0].name,
                        //trackLength: millisToMinutesAndSeconds(item.duration_ms),
                        //trackAlbum: item.preview_url,
                        type: item.type,
                        albumImage: item.images[1].url,
                        images: item.images
                    };
                    console.log(specificAlbumData);
                    myArray.push(specificAlbumData);

                    console.log(item.images[i]);

                }
               
                console.log(myArray);
                res.send(myArray);
            });
});







app.post('/tracks', function(req,res) {  
  //console.log(req.body);
  var clientQuery = req.body.trackName;
    spotify.search({ type: 'track', query: clientQuery}, function(err, data) {
        if ( err ) 
        {
        console.log('Error occurred: ' + err);
        return;
        }

        var myArray = []; 
        //try to interpret this for-loop. the purpose of this for loop is to sort the results into a easier or a simpler array of objects with needed information like title, duration since the api returns alot of things for each object returned 

        var items = data.tracks.items;
        console.log(items);
        for (var i = 0; i<items.length; i++)
        {
            var item = items[i];

            var name = item.name;
            var id = item.id;
            var duration = item.duration_ms;
            var artistName = item.artists[0].name;
            var trackAlbum = item.album.name;
            var sample = item.preview_url;
            var dataType = item.type;
            var images = item.album.images;
            console.log(images);
            var specificTrackData = 
            {
              trackID: id,
              trackName: name,                        
              trackLength: millisToMinutesAndSeconds(duration),
              trackArtist: artistName,
              trackAlbum: trackAlbum,
              trackPreview: sample,
              type: dataType,
              images : images
            };//<--I AM SENDING THIS OBJECT BACK TO THE CLIENT SIDE
            myArray.push(specificTrackData); //PUSHING TO THE EMPTY ARRAY COLLECTING RESULTS 
            }
        
        res.send(myArray); //res responds things back to the browser. the object i made is being sent back to 
        //console.log(myArray);
    });
});







app.post('/artists', function(req,res){
		            
            var clientQuery = req.body.artistName;
            //var clientQuery = 'flying lotus';
           
            console.log("----------------------------------test--------------------------------");
        
            spotify.search({ type: 'artist', query: clientQuery}, function(err, data) {
                if ( err ) 
                {
                console.log('Error occurred: ' + err);
                return;
                }
                
                var myArray = [];
                //try to interpret this for-loop
                var items = data.artists.items;
                for (var i = 0; i<items.length; i++)
                {
                    var item = items[i];
                    console.log(item.name);
                    
                    console.log(item.id);
                    var name = item.name;
                    var genres = item.genres;

                    console.log("–––");

                    console.log("***");
                    
                    var specificArtistData = {
                        artistID: item.id,
                        artistName: name,
                        artistGenres: genres,
                        artistImage: item.images[2],
                        //trackArtist: item.artists,
//                        trackArtist: item.artists[0].name,
//                        trackLength: millisToMinutesAndSeconds(item.duration_ms),
//                        trackAlbum: item.album.name,
//                        trackPreview: item.preview_url,
                        type: item.type,
                        images: item.images
                        
                    };
                    
                     console.log(items);
                    myArray.push(specificArtistData);
                }
                res.json(JSON.stringify(myArray)); //res responds things back to the browser
                
                console.log(myArray);
               
            });
});




/*

DATABASE SCRIPTS for collections..inserting and getting data
//DATABASE (my database api?)

*/
var api = require('./app/routes/api.js');
app.post('/saveTrack', api.addTrack);
app.post('/saveAlbum', api.addAlbum);
app.post('/saveArtist', api.addArtist);
app.post('/collection/tracks', api.getCollectedTracks);
app.post('/collection/albums', api.getCollectedAlbums);
app.post('/collection/artists', api.getCollectedArtists);
  
app.post('/deleteAlbum', api.deleteAlbum);
app.post('/deleteTrack', api.deleteTrack);









function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}







