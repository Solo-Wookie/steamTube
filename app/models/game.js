var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs = require('fs');

var GameSchema = new Schema({
  name : { type: String, required: true, index: { unique: true }},
  price: String,
  image: String,
  link: String,
  orderId : Number,
  largeImage: String,
  type : String

})
module.exports = mongoose.model('Game', GameSchema);
