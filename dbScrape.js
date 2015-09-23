//File is a test file copy of testScrape.js, work in progress.

var results = [];
var casper = require('casper').create();
var fs = require('fs');

var url = 'https://steamdb.info/';
var games = [];
var terminate = function() {
    this.echo("Exiting..").exit();
};

function getGames() {
    var list = document.querySelectorAll('div.tab_item_name');
    var test = document.querySelectorAll('img.tab_item_cap_img');
    var images = [];
    for(var j = 0; j < test.length; j++) {
      var imageLink = test[j].getAttribute('src')
      var testCut = imageLink.indexOf("capsule")
      images.push(imageLink.slice(0, testCut) + "header.jpg");
    }

    var prices = document.getElementsByClassName('tab_item')
    var result = [];
    for(var i = 0; i < prices.length; i++) {
      var price = prices[i].querySelector('div.discount_final_price') || " ";;
      console.log(price)
      result.push(price);
    }
    var link = document.querySelectorAll('a.tab_item_overlay');
    var games = [];
    for(var k = 0; k < list.length; k++) {
      games.push({
        'title' : list[k].innerHTML,
        'image' : test[k].getAttribute('src'),
        'largeImage' : images[k],
        'price' : result[k].innerHTML,
        'link'  : link[k].getAttribute('href')
      });
    }
    return games;
}

var processPage = function() {
    games = this.evaluate(getGames);
    require('utils').dump(games);

};
casper.start(url);
casper.waitForSelector('div.tab_item', processPage, terminate, 10000);
casper.then(function() {
  fs.write("public/assets/dataFile.json", JSON.stringify(games), 'w');
});
casper.run();

