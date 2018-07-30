//require node modules
var dotenv = require("dotenv").config();

var Twitter = require('twitter');
var fs = require("fs");

var request = require('request');
const  inquirer = require('inquirer');
var song;


//exports twitter and spotify keys
var keys = require("./keys.js");

//acces key information 
var client = new Twitter(keys.twitter);




function ask(){ 
    var List = require('prompt-list');
    var list = new List({
    name: 'order',
    message: 'What would you like to order?',
    // choices may be defined as an array or a function that returns an array
    choices: [
        'my-tweets',
        'spotiy-this-song',
        'movie-this',
        'do-what-it-says'
    ]
    });
   
    list.ask(function(answer) {
       if(answer === 'my-tweets'){
        tweets();
       }
       else if(answer === 'spotiy-this-song'){
        music(1);
       }
       if(answer === 'movie-this'){
        movie();
       }
       if(answer === 'do-what-it-says'){
        file();
       }
    });

}

ask();

function tweets(){

    var params = {screen_name: '@karensa27136283', count:20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        //console.log(tweets);
    }
    
    console.log(" ");
    console.log("------------------");
    console.log("-     TWEETS    -");
    console.log("------------------");
    for (var i = 0; i < tweets.length; i++){
        var tweet = tweets[i].text;
        var date = tweets[i].created_at;

        console.log(">>>content: ");
        console.log(" ");
        console.log(tweet);
        console.log(" ");
        console.log(">>>Created it on: " + date);
        console.log("****************************************************************");
    }
    //console.log(tweets);
});


}

function music(num){

    var Spotify = require('node-spotify-api');
    
    var spotify = new Spotify(keys.spotify);

    if(num === 1){
    
        var Prompt = require('prompt-base');
        var prompt = new Prompt({
        name: 'song',
        message: 'What song do you want to search?'
        });
        
        // promise
        prompt.run()
        .then(function(answer) {

            if(answer === undefined){ 
                spotify.request("https://api.spotify.com/v1/tracks/5ksRONqssB7BR161NTtJAm" )
                .then(function(data) {
                    
                    console.log(" ");
                    console.log("-------------------");
                    console.log("    Spotify Song");
                    console.log("-------------------");
                    console.log(" ");
                    console.log(">>> Artist: " + data[i].artists[0].name);
                    console.log(">>> Song: " + data[i].name);
                    console.log(">>> Album: " + data[i].album.name);
                    console.log(">>> Preview Url: " + data[i].preview_url);
                })
                .catch(function(err) {
                console.error('Error occurred: ' + err); 
                });

            }
            else{
                spotify.search({ type: 'track', query: answer }, function(err, data) {
                    if (err) {
                    return console.log('Error occurred: ' + err);
                    }
                    var songinfo = data.tracks.items;
                    for(var i =0; i<songinfo.artists.length; i++){
                        console.log(" ");
                        console.log("-------------------");
                        console.log("    Spotify Song");
                        console.log("-------------------");
                        console.log(" ");
                        console.log(">>> Artist: " + songinfo[i].artists[0].name);
                        console.log(">>> Song: " + songinfo[i].name);
                        console.log(">>> Album: " + songinfo[i].album.name);
                        console.log(">>> Preview Url: " + songinfo[i].preview_url);
                        console.log("****************************************************************");
                    }      
                    
                
                });
        
            }
            
        });
    }
    else{
        console.log(song);
        spotify.search({ type: 'track', query: song }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var songinfo = data.tracks.items;
            for(var i =0; i<songinfo.artists.length; i++){
                console.log(" ");
                console.log("-------------------");
                console.log("    Spotify Song");
                console.log("-------------------");
                console.log(" ");
                console.log(">>> Artist: " + songinfo[i].artists[0].name);
                console.log(">>> Song: " + songinfo[i].name);
                console.log(">>> Album: " + songinfo[i].album.name);
                console.log(">>> Preview Url: " + songinfo[i].preview_url);
                console.log("****************************************************************");
            }      
    
        });

    }
      
}

function movie(){ 
    var Prompt = require('prompt-base');
    var prompt = new Prompt({
      name: 'song',
      message: 'What song do you want to search?'
    });
     
    // promise
    prompt.run()
      .then(function(answer) {

        if(answer === undefined){ 
            request("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy", function(error, response, body) {
                
                if (!error && response.statusCode === 200) {
                    var movie = JSON.parse(body); 
                    console.log(" ");
                    console.log("-------------------");
                    console.log("       Movie");
                    console.log("-------------------");
                    console.log(" ");
                    console.log(">>> Title: " + movie.Title);
                    console.log(">>> Year: " + movie.Year);
                    console.log(">>> Imdb Rating: " + movie.imdbRating);
                    console.log(">>> Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
                    console.log(">>> Country: " + movie.Country);
                    console.log(">>> Language: " + movie.Language);
                    console.log(">>> Plot: " + movie.Plot);
                    console.log(">>> Actors: " + movie.Actors);
                }
                else{
                    console.log('error:', error);
                }
            });

        }
        else{
            var x = answer.split(" ");
            var movieName = "";
            for(var i=0; i<x.length; i++){
                if(i != x.length-1){
                    movieName += x[i] + "+";
                }
                else{
                    movieName += x[i]
                }
                
            }

            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

            // This line is just to help us debug against the actual URL.
            console.log(queryUrl);

            request(queryUrl, function(error, response, body) {

                if (!error && response.statusCode === 200) {

                    var movie = JSON.parse(body); 
                    console.log(" ");
                    console.log("-------------------");
                    console.log("       Movie");
                    console.log("-------------------");
                    console.log(" ");
                    console.log(">>> Title: " + movie.Title);
                    console.log(">>> Year: " + movie.Year);
                    console.log(">>> Imdb Rating: " + movie.imdbRating);
                    console.log(">>> Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
                    console.log(">>> Country: " + movie.Country);
                    console.log(">>> Language: " + movie.Language);
                    console.log(">>> Plot: " + movie.Plot);
                    console.log(">>> Actors: " + movie.Actors);
                }
                else{
                    console.log('error:', error);
                }
            });
              
            
        }
          
        
       
    
          
      })
      

}

function file(){ 

    fs.readFile("random.txt", "utf8",  function(err, data){
        if(err){
            console.log(err);
        }

        song = data;
        music(0);

    });

}

//https://ksalazar91.github.io/Responsive-Portfolio/portfolio.html

 