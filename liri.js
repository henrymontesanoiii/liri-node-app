require("dotenv").config();
// spotify keys
const keys = require("../liri-node-app/keys");
//argument variables
let action = process.argv[2];
let thing = process.argv.slice(3).join(" ");


//bands in town command
if (action === "concert-this") {
  bands();
};

//spotify command
if (action === "spotify-this-song") {
  spotify();
};

//omdb command
if (action === "movie-this") {
movie();
}

//do what it says command
if (action === "do-what-it-says"){
var fs = require("fs");
fs.readFile("random.txt", "utf8", function(error, data) {
  if (error) {
    return console.log(error);
  }
  data = data.split(", ");
  
  switch (data[0]) {
    case "spotify-this-song":
      thing = data[1];
      spotify();
      break;
    case "concert-this":
    thing = data[1];
    bands();
    break;
    case "movie-this":
    thing = data[1];
    movie();
    break;

}})};

// movie function
function movie(){
  var request = require("request");
  if (thing === ""){
    request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy", function (error, response, body) {
    if (error) {
      return console.log('Error occurred: ' + err);
    }
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Year);
    console.log("Rated: " + JSON.parse(body).Rated);
    console.log("Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value);
    console.log("Produced in: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  })}
  else {
  request("http://www.omdbapi.com/?t=" + thing + "&y=&plot=short&apikey=trilogy", function (error, response, body) {


    if (error) {
      return console.log('Error occurred: ' + err);
    }
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Year);
    console.log("Rated: " + JSON.parse(body).Rated);
    console.log("Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value);
    console.log("Produced in: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);

  })};

}
//spotify function
function spotify(){
  const Spotify = require('node-spotify-api');

  const spotify = new Spotify(keys.spotify);
  console.log(thing);
  
  if (thing === "") {
    spotify.search({
      type: 'track',
      query: "The Sign Ace of Base",
      limit: 1
    }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      console.log("Artist(s) : " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
      console.log("Song : " + JSON.stringify(data.tracks.items[0].name, null, 2));
      console.log("Link : " + JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2));
      console.log("Album : " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
    })
  }
  else {
  spotify.search({
    type: 'track',
    query: thing,
    limit: 1
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log("Artist(s) : " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
    console.log("Song : " + JSON.stringify(data.tracks.items[0].name, null, 2));
    console.log("Link : " + JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2));
    console.log("Album : " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
  })} 
}
// bandsintownfucntion
function bands(){
  const request = require('request');
  let url = "https://rest.bandsintown.com/artists/" + thing + "/events?app_id=codingbootcamp";

  const j = {
    json: true
  };
  request(url, j, function (error, data) {
    if (error) return console.log(error);
    
    for (var i = 0; i < data.body.length; i++) {
      console.log("")
      console.log(data.body[i].venue.name)
      console.log(
        data.body[i].venue.city +
        (data.body[i].venue.region ? ", " + data.body[i].venue.region : "") +
        ", " + data.body[i].venue.country
      );
      let dt = data.body[i].datetime.split("T");
      // moment().format();
      console.log(dt[0]);
    }
  })
}