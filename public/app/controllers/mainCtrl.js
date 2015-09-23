angular.module('mainCtrl', ['gameService', 'youtube-embed', 'steamService'])
  
.controller('mainController', function($scope, $location, Game, $timeout, Steam) {

  // grab all the games at page load
  $scope.steam = "http://store.steampowered.com/";
  Game.all()

    .success(function(data) {     
      $scope.games = data;
      var allTypes = [];
      for(var i = 0; i < data.length; i++) {
        var typeArray = data[i].type.split(', ');
        for(var j = 0; j < typeArray.length; j++) {
          if(allTypes.indexOf(typeArray[j]) === -1 && typeArray[j] !== "") {
            allTypes.push(typeArray[j])
          }
        }
      }
      $scope.types = allTypes;
    });

  $scope.adventureBox = function(){
    if(!$scope.Adventure) {
      $scope.Adventure = "Adventure"
    } else {
      $scope.Adventure = "";
    }
  } 
  $scope.earlyBox = function(){
    if(!$scope.Early) {
      $scope.Early = "Early Access"
    } else {
      $scope.Early = "";
    }
  } 
  $scope.indieBox = function(){
    if(!$scope.Indie) {
      $scope.Indie = "Indie"
    } else {
      $scope.Indie = "";
    }
  } 
  $scope.fpsBox = function(){
    if(!$scope.FPS) {
      $scope.FPS = "FPS"
    } else {
      $scope.FPS = "";
    }
  }
  $scope.single = function() {
    var gameId = this.game["_id"];
    $location.path('/game/'+ gameId)
  }
  
  //This part work in progress
  // $scope.authenticate = function() {
  //   Steam.authenticate().then(function(){console.log("anything")});
  // }
})
