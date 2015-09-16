var express = require('express');
var app = express();
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Game = require(__dirname + '/app/models/game');
var fs = require('fs');
var port = process.env.PORT || 1337;
var steam = require('steam-login');

// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'a secret' }));
app.use(steam.middleware({
    // realm: 'http://steamtube.herokuapp.com/', 
    // verify: 'http://steamtube.herokuapp.com/verify',
    realm: 'localhost:1337/', 
    verify: 'localhost:1337/verify',
    apiKey: '8DC59D4129BEB36BAA2E71A0BEFFE34C'}
));

app.get('/authenticate', steam.authenticate(), function(req, res) {
  console.log(req)

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

  res.redirect('/');
});
 
app.get('/verify', steam.verify(), function(req, res) {
  res.send(req.user).end();
});
 
app.get('/logout', steam.enforceLogin('/'), function(req, res) {
  req.logout();
  res.redirect('/');
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
app.listen(port);
