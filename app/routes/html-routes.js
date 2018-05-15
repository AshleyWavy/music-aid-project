
//var app = require('../../server.js');
var path = require('path');

module.exports=function(app){
    app.get ('/', function (req, res){
        res.sendFile(path.join(__dirname , '/../public/index.html'));
    }); 
        
    app.get ('/search', function (req, res){
        res.sendFile(path.join(__dirname , '/../public/search.html'));
    }); 
        
    app.get ('/test', function (req, res) {
        res.send("A testing page for testing routes");
    });
    
    app.get ('/collection', function (req, res){
        res.sendFile(path.join(__dirname , '/../public/collection.html'));
    }); 
    app.get ('/collection/tracks', function (req, res){
        res.sendFile(path.join(__dirname , '/../public/collection-tracks.html'));
    }); 
    app.get ('/collection/albums', function (req, res){
        res.sendFile(path.join(__dirname , '/../public/collection-albums.html'));
    }); 
    app.get ('/collection/artists', function (req, res){
        res.sendFile(path.join(__dirname , '/../public/collection-artists.html'));
    }); 
    app.get ('/faq', function (req, res){
        res.sendFile(path.join(__dirname , '/../public/faq.html'));
    }); 
}

