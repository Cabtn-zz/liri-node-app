//This is where I have my twitter credentials
var key = require("./key");
var fs = require("fs");

var twitterPackage = require("twitter");
var spotify = require("spotify");

// import
var APIClinet = require('omdb-api-client');

// instantiate
var omdb = new APIClinet();

//This inputs the key into the twitter API
var twitter = twitterPackage(key)

var liri = process.argv[2];
//FIX this variable so you don't have the key here
var client = new twitterPackage({
  consumer_key: 'hPxpkhaGWrdEyixrPO9l6oskc',
  consumer_secret: 'o9EfrFuebPQ8FRDvV8I8hao6CNFUbFmiqOH7UAmSs0yZ13x7nH',
  access_token_key: '65854240-dh2EXWRtpi8LFgbmocLSF0p6RT7Mq712YNl2fkRBv',
  access_token_secret: 'KSHjmp0aLWM1GgkLGEVPLtb9AjdcnfFRhpoWReaYPKXE5',
});
//this is what runs everything
function runLiri(liri) {
    if (liri ==="my-tweets"){
        myTweets(liri);
    }
    else if (liri === "spotify-this-song"){
        mySpotify(liri, process.argv[3]);
    }
    else if (liri ==="movie-this"){
        myMovie(liri, process.argv[3]);
    }
    else if (liri ==="do-what-it-says"){
        readRandom();
    }
}

function myTweets(liri){
    client.get('statuses/user_timeline', {screen_name: "@cabtn"},  function(error, tweets, response) {
         //loops through 20 tweets in the Twitter api
        for (var i = 0; i < 20; i++){
            console.log("===========================");
            console.log("Tweet: " + tweets[i].text)
       
        }
    });
}

function mySpotify(liri, songName){
    spotify.search({ type: 'track', query: songName }, function(err, data) {  
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;   
        }
        if (songName === undefined) {
            console.log("===========================");
            console.log("'The Sign' by Ace of Base")
            console.log("===========================");
        }
    else {
            console.log("===========================");
            console.log("Songname " + songName);
            console.log(data.tracks.items[0].album.name);
            console.log(data.tracks.items[0].artists[0].name); 
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].preview_url);
            console.log("===========================");
        }
    });
}

function myMovie(liri, search){
    if (process.argv[3]) {
    //if the user inputs a search
        omdb({t:search}).list().then(function(data) {
                    console.log("=========================== Movies =====================");
                    console.log("Title: " + data.title);
                    console.log("Year Released: " + data.year);
                    console.log("Plot: " + data.plot);
                    console.log("Director: " + data.directors);
                    console.log("Actors: " + data.actors);
                    console.log("IMDB Rating: " + data.ratings[0].Value);
                    console.log("RT Rating: " + data.ratings[1].Value);
                    console.log("Language: " + data.languages);
                    console.log("Countries Filmed In: " + data.countries);
                    //incase a user has a movie title with spaces
                    search = search.split(' ').join('_');
                    console.log("RT URL: https://www.rottentomatoes.com/m/" + search)
                    console.log("========================================================");
        });
    }
    //default if no response
    else {
        console.log("===========================");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix");
        console.log("===========================");
    }
}

function readRandom() {
//This reads the random.txt file and seprates it into an array
    fs.readFile("random.txt", "utf-8", function(error, data) {
        var arrayData = data.split(",");
        //we then reassign the parameters for the liri function to the values in the array
        liri = arrayData[0];
        process.argv[3] = arrayData[1];
        runLiri(liri)
    });
}

runLiri(liri);
