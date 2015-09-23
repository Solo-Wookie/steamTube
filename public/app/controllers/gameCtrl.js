angular.module('gameCtrl', ['gameService', 'youtube-embed', 'twitchService', 'steamService'])

.controller('gameController', function($scope, $location, Game, $routeParams, $timeout, $sce, Twitch, Steam) {
  Game.get($routeParams.id)
    .success(function(data) {
      $scope.name = data.name
      $scope.price = data.price
      $scope.link = data.link
      $scope.largeImage = data.largeImage
      $scope.tags = data.type
      
      Twitch.get('https://api.twitch.tv/kraken/streams?game=' + data.name)
        .success(function(stream){
          if(stream["streams"][0]) {
            var channel = stream["streams"][0]["channel"]["url"] + "/embed";
          } else {
            var channel = "http://placehold.it/485x390/ffffff/?text=No Streams"
          }
          $scope.twitch = $sce.trustAsResourceUrl(channel);
        })
      onClientLoad()
    })

  function showResponse(response) {
      var responseString = JSON.stringify(response, '', 2);
      $scope.video1 = JSON.parse(responseString).items[0].id.videoId || JSON.parse(responseString).items[1].id.videoId;
      $scope.$apply()
      
  }

  // Called automatically when JavaScript client library is loaded.
  function onClientLoad() {
      gapi.client.load('youtube', 'v3', onYouTubeApiLoad);

  }

  // Called automatically when YouTube API interface is loaded (see line 9).
  function onYouTubeApiLoad() {
      gapi.client.setApiKey('AIzaSyCzMMTskQ7-gRIi0BMYoO2rU1o2vVw7OrQ');

      search();
  }

  function search() {
      // Use the JavaScript client library to create a search.list() API call.
      var request = gapi.client.youtube.search.list({
          part: 'snippet',
          q: "Let's play " + $scope.name
      });
      console.log("$SCOPE.NAME === ", $scope.name);
      // Send the request to the API server,
      // and invoke onSearchRepsonse() with the response.
      request.execute(onSearchResponse);
  }

  // Called automatically with the response of the YouTube API request.
  function onSearchResponse(response) {
      showResponse(response);
  }

})

