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
    var test = document.querySelectorAll('img.tab_item_cap_img');
    var images = [];
    for(var j = 0; j < test.length; j++) {
      var andrew = test[j].getAttribute('src')
      var testCut = andrew.indexOf("231")
      images.push(andrew.slice(0, testCut) + "sm_120.jpg");

      // sm_120.jpg
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
        // 'image' : images[k].getAttribute('src'),
        'image' : images[k],
        'price' : result[k].innerHTML,
        'link'  : link[k].getAttribute('href')
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

