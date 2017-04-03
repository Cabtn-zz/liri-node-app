//This is where I have my twitter credentials
var key = require("./key");

var twitterPackage = require("twitter");
var spotify = require("spotify");


//This inputs the key into the twitter API
var twitter = twitterPackage(key)

var liri = process.argv[2].toLowerCase();
var secondLiri = process.argv[3].toLowerCase();
//FIX this variable so you don't have the key here
var client = new twitterPackage({
  consumer_key: 'hPxpkhaGWrdEyixrPO9l6oskc',
  consumer_secret: 'o9EfrFuebPQ8FRDvV8I8hao6CNFUbFmiqOH7UAmSs0yZ13x7nH',
  access_token_key: '65854240-dh2EXWRtpi8LFgbmocLSF0p6RT7Mq712YNl2fkRBv',
  access_token_secret: 'KSHjmp0aLWM1GgkLGEVPLtb9AjdcnfFRhpoWReaYPKXE5',
});

function myTweets(liri){
    if (liri === "my-tweets"){
        client.get('statuses/user_timeline', {screen_name: "@cabtn"},  function(error, tweets, response) {
            console.log(tweets); 
        });
    }
}

function mySpotify(liri, songName){
    if (liri === "spotify-this-song"){
        console.log(liri);
        spotify.search({ type: 'track', query: songName }, function(err, data) {
           
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;   
            }

        console.log("Songname " + songName);
        //console.log(data);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].artists[0].name); 
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].preview_url);
        });
    }
}

mySpotify(liri, secondLiri);
myTweets(liri);