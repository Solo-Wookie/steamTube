var express = require('express');
var app = express();
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Game = require(__dirname + '/app/models/game');
var fs = require('fs');

// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

//log all requests to the console/terminal
app.use(morgan('dev'));

//connect mongoose
mongoose.connect('mongodb://blah:blah@ds042688.mongolab.com:42688/steamtube');

// trying to get json file to mongoose
fs.readFile(__dirname + '/public/assets/dataFile.json', 'utf8', function (err, data) {
  if(err){
    throw err;
  }
  // var json = JSON.parse(JSON.stringify(data));
  var json = JSON.parse(data);
  // console.log(json);
  // var game = new Game({
  //   name : "yo",
  //   price : "19.99",
  //   image: "blah",
  //   link: "blah"
  // })
  for(var i = 0; i < json.length; i++) {
    var game = new Game({
      name : json[i]["title"],
      price: json[i]["price"],
      image: json[i]["image"],
      link: json[i]["link"],
      largeImage: json[i]["largeImage"],
      orderId : i
    });
    console.log(game)
    game.save(function(err, game) {
      if(err){
        return console.error(err);
      }
    // console.dir(game);
    });
  }
  // game.save(function(err, game) {
  //   if(err){
  //     return console.error(err);
  //   }
    
  // console.dir(game);
  // });
});

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));


// API ROUTES ------------------------
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);


app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
  // res.sendFile(path.join(__dirname + '/dataFile.txt'));
});
app.listen(1337);
