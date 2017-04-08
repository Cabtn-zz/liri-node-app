//This is where I have my twitter credentials
var key = require("./key");

var twitterPackage = require("twitter");
var spotify = require("spotify");
var omdb = require('omdb');
var imdb = require('imdb');

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
}

function myTweets(liri){
        client.get('statuses/user_timeline', {screen_name: "@cabtn"},  function(error, tweets, response) {
            console.log(tweets); 
            //console.log(response);
        });
}

function mySpotify(liri, songName){
        console.log(liri);
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
    if (search === true){
        omdb.search(search, function(err, movies) {
            if(err) {
                return console.error(err);
            }
        
            if(movies.length < 1) {
                console.log("===========================");
                console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix");
                console.log("===========================");
            }
            else {
                //console.log(movies[0]);
                imdb(movies[0].imdb, function(err, data) {
                    //console.log(data);
                    console.log("===========================");
                    console.log("Title: " + data.title);
                    console.log("Rating: " + data.rating);
                    //console.log("Language: " + data.language;
                    console.log("Plot: " + data.description);
                    console.log("Director: " + data.director);
                    console.log("===========================");
                });
            }
        });
    }
    
    else {
        console.log("===========================");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix");
        console.log("===========================");
    }
} 
runLiri(liri);
