var results = [];
var casper = require('casper').create();
var fs = require('fs');

var url = 'http://store.steampowered.com/tag/en/Action/#os%5B%5D=mac&p=0&tab=NewReleases';
var games = [];
var terminate = function() {
    this.echo("Exiting..").exit();
};

function getGames() {
    var list = document.querySelectorAll('div.tab_item_name');
    var images = document.querySelectorAll('img.tab_item_cap');
    var prices = document.getElementsByClassName('tab_item')
    var result = [];
    for(var i = 0; i < prices.length; i++) {
      var price = prices[i].querySelector('div.discount_final_price');
      console.log(price)
      if(!price) {
        result.push(' '); 
      } else {
        result.push(price); 
      }
    }
    var link = document.querySelectorAll('a.tab_item_overlay');
    var games = [];
    for(var i = 0; i < list.length; i++) {
      games.push({
        'title' : list[i].innerHTML,
        'image' : images[i].getAttribute('src'),
        'price' : result[i].innerHTML,
        'link'  : link[i].getAttribute('href')
      });
    }
    return games;
}

var processPage = function() {
    games = this.evaluate(getGames);
    // require('utils').dump(JSON.stringify(games));
    require('utils').dump(games);

};
casper.start(url);
casper.waitForSelector('div.tab_item', processPage, terminate, 10000);
casper.then(function() {
  // fs.write("dataFile.txt", "'yo'", 'w');
  // fs.write("dataFile.txt", JSON.stringify(games), 'w');
  fs.write("public/assets/dataFile.json", JSON.stringify(games), 'w');
  // fs.write("dataFile.txt", JSON.parse(JSON.stringify(games)), 'w');
  // fs.write("/public/assets/dataFile.json", "yo", 'w');
});
casper.run();

