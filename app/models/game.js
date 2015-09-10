var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require('fs');

var GameSchema = new Schema({
  name : { type: String, required: true, index: { unique: true }},
  // name: String,
  price: String,
  image: String,
  link: String,
  orderId : Number,
  largeImage: String

})
module.exports = mongoose.model('Game', GameSchema);
// var Game = mongoose.model('Game', GameSchema

// fs.readFile('../../public/assets/dataFile.json', 'utf8', function (err, data) {
//   if(err){
//     throw err;
//   }
//   var json = JSON.parse(JSON.stringify(data));
//   console.log(json);
//   var game = new Game({
//     name : "testing",
//     price : "19.99",
//     image: "blah",
//     link: "blah"
//   })
//   game.save(function(err, game) {
//     if(err){
//       return console.error(err);
//     }
    
//   console.dir(game);
//   });
// });