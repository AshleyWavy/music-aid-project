
//var app = require('../../server.js');
var path = require('path');

module.exports=function(app){
    app.get ('/search', function (req, res){
        res.sendFile(path.join(__dirname , '/../public/index.html'));
    }); 
        
    app.get ('/test', function (req, res) {
        res.send("A testing page for testing routes");
    });
    
    app.get ('/collection/tracks', function (req, res){
        res.sendFile(path.join(__dirname , '/../public/collection-tracks.html'));
    }); 
    app.get ('/collection/albums', function (req, res){
        res.sendFile(path.join(__dirname , '/../public/collection-albums.html'));
    }); 
}

