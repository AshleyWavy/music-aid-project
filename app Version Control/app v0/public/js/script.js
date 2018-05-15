 "use strict";
    $().ready(function(){
        $("#result").hide();
        $("#formArea").hide();
        
        $("#albumSearch").on("click", function(e){
                e.preventDefault();
                $("#formArea").show();
                $("#artistForm").hide();
                $("#albumForm").show();
                $("#trackForm").hide();
            $("#resultArea").html("");
        });
        $("#artistSearch").on("click", function(e){
                e.preventDefault();
                $("#formArea").show();
                $("#albumForm").hide();
                $("#artistForm").show();
                $("#trackForm").hide();
            $("#resultArea").html("");
        });
        $("#trackSearch").on("click", function(e){
                e.preventDefault();
                $("#formArea").show();
                $("#albumForm").hide();
                $("#artistForm").hide();
                $("#trackForm").show();
            $("#resultArea").html("");
        });
        
        $("#submit").on("click", function(e){
            
            //$("#artistForm").hide();
            $("#result").show();

            e.preventDefault();
            
            
            //get value from fields.
            var data = {
                albumName: $("#typeAlbum").val()
            };
            
//            $.post("/formdata",data,function(result){
//                result = JSON.parse(result); //turn the string into a JavaScript object
//                console.log(result);
//                var html = "<li>Name: " + result.fullName + "</li>";
//                $("#result > ul").html(html);
//
//            });
            $.post("/albums",data,function(result){
                //result = JSON.parse(result); //turn the string into a JavaScript object
                console.log(result); //log results into console on client side
                
                var items = result;
                //console.log(items);
                var resultArea = $("#resultArea");
                $('#resultArea').html('');
                //result = "";
                
                var headingRow = $("<tr></tr>");

                var headings = "<th>Album Art</th>";
                headings += "<th> Album </th>";
                headings += "<th> Artist </th>";
                headings += "<th> Options </th>";
                headingRow.append(headings);
                resultArea.append(headingRow);
                
                for (var i = 0; i<items.length; i++)
                {
                    var item = items[i];
                    albumInfo[item.albumID]=item; //Associative array   

                    var output = '<td>' + '<img src="' + item.albumImage + '">' + '</td>'; 
                    output += "<td>" + item.albumName + "</td>";
                    output += "<td>" + item.albumArtist + "</td>";
                    
                    //output += "<td>" + item.albumID + "</td>";
//                    var artists = item.artists;
//                    for (var j = 0; j<artists.length; j++) 
//                    {
//                    var artist = artists[j];
//                    output += "artist: " + artist.name + "<br/>";
//                    }
              var button = $("<button></button>");
                    button.attr("id", item.albumID);
                    //button.addClass("addBtn");
                    button.addClass("addAlbum");
                    button.html("Add");
                    var td = $("<td></td>");
                    td.append(button);
                    button.click(postData);
                    
                    var para = $("<tr></tr>");//create a row
                    para.append(output);
                    para.append(td);
                    resultArea.append(para);
                
                }
//            var html = "<li>Name: " + result.fullName + "</li>";
//                $("#result > div").html(html);

            });
        });
        
        $("#submitArtist").on("click", function(e){
            //$("#artistForm").hide();
            $("#result").show();

            e.preventDefault();
            
            
            //get value from fields.
            var data = {
                artistName: $("#typeArtist").val()
            };
            console.log(data); // for testing check developer tools
            
            $.post("/artists",data,function(result){
                result = JSON.parse(result); //turn the string into a JavaScript object
                console.log(result); //log results into console on client side
                
                var items = result;
                console.log(items);
                var resultArea = $("#resultArea");
                $('#resultArea').html('');
                
                var headingRow = $("<tr></tr>");

                var headings = "<th>Artist Name</th>";
                headings += "<th> </th>";
                headings += "<th>  </th>";
                headingRow.append(headings);
                resultArea.append(headingRow);


                for (var i = 0; i<items.length; i++)
                {
                     var item = items[i];
                     artistInfo[item.artistID]=item; //Associative array   

                     var output = "<td>" + item.artistName + "</td>";
                    output += "<td>" + '<img src="' + item.artistImage.url + '"></td>'; 
                    //output += "<td>"  + item.id + "</td>";
                    output += "<td>"  + '<button id= "' + item.artistID + '">' + 'Add' + "</button>" + "</td>";
                    
                    //var artists = item.artists;
                    // for (var j = 0; j<artists.length; j++) 
                    // {
                    // var Track = artists[j];
                    // output += "Track: " + Track.name + "<br/>";
                    // }
                    var para = $("<tr></tr>");//create a row
                    para.html(output);
                    resultArea.append(para);
               }
            
        });
    });
        
    var trackInfo = [];
    var artistInfo = [];
    var albumInfo = [];
        
    $("#submitTrack").on("click", function(e){
    //$("button").on("click", function(e){
            //$("#artistForm").hide();
            $("#result").show();

            e.preventDefault();
            
            var type = $("#type");
    
            //get value from fields.
            var data = {
                trackName: $("#typeTrack").val()
            };
            /*
                console.log(data); // for testing check developer tools
            */
            $.post("/tracks",data,function(result){
                console.log(result);
                
                /*
                result = JSON.parse(result);
                console.log(result);
                */
                
                var resultArea = $("#resultArea");
                $('#resultArea').html(result);
                /*result = JSON.parse(result); //turn the string into a JavaScript object
                console.log(result); //log results into console on client side
                */ //HIDDEN FEB 27 18
                
                var items = result;
                
                var resultArea = $("#resultArea");
                $('#resultArea').html('');
                
                var headingRow = $("<tr></tr>");

                var headings = "<th> Name</th>";
                headings += "<th> Artist</th>";
                headings += "<th> Time </th>";
                headings += "<th> </th>";
                headingRow.append(headings);
                resultArea.append(headingRow);


                for (var i = 0; i<items.length; i++)
                {
                     var item = items[i];
                     trackInfo[item.trackID]=item; //Associative array   
                     var output = "<td>" + item.trackName + "</td>";
                     //output += "<td>" + '<img src="' + item.trackArtist + '">' + '</td>'; 
                     output += "<td>"  + item.trackArtist + "</td>";
                     output += "<td>"  + item.trackLength + "</td>";
                    //output += "<td>"  + '<button id= "' + item.trackID + '">' + 'Add' + "</button>" + "</td>";
                    //output += "<td>"  + '<a href="/add"><button id= "' + item.trackID + '">' + 'Add' + "</button></a>" + "</td>";
                    var button = $("<button></button>");
                    button.attr("id", item.trackID);
                    //button.addClass("addBtn");
                    button.addClass("addTrack");
                    button.html("Add");
                    var td = $("<td></td>");
                    td.append(button);
                    button.click(postData);
                    
                    var para = $("<tr></tr>");//create a row
                    para.append(output);
                    para.append(td);
                    resultArea.append(para);
               }
            });
   
        
    });
    
    function postData()
    {
       //alert("INSIDE BUTTON!");
        var id = $(this).attr("id"); 
        var className = $(this).attr("class"); 
        //if(id = "trackInfo")
        //{
        console.log(className);
        
        if(className == "addTrack")
        {
            console.log('ISSA TRACK');

            var data = {
            item: trackInfo[id] 
            };
            $.post("/saveTrack",data,function(result){
                console.log("Track Has Been Saved..");
            });
        }

        if(className == "addAlbum"){
            console.log("ISSA ALBUM");
            
             var data = {
            item: albumInfo[id] 
            };
            $.post("/saveAlbum",data,function(result){
                console.log("Album Has Been Saved..");
            });
        }      
    };
        
});