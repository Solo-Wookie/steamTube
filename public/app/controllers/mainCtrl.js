angular.module('mainCtrl', ['gameService', 'youtube-embed'])
// angular.module('mainCtrl', [])
  
// .controller('mainController', function($rootScope, $location, Auth) {
.controller('mainController', function($scope, $location, httpDataLoader, Game, $timeout) {

  // $scope.results = httpDataLoader.load();

  // $scope.results.then(function(response){
  //   console.log("success", response);
  //   $scope.games = response.data;
  //   // debugger
  // }, function(response){
  //   console.log('error')
  // });
  
  // grab all the users at page load

  $scope.single = function() {
    var gameId = this.game["_id"];
    // 
    console.log(this.game["_id"]);
    // console.log("yoooooooo" + newScope.blah)
    $location.path('/game/'+ gameId)
  }


  Game.all()

    .success(function(data) {
      // when all the users come back, remove the processing variable
      $scope.processing = false;
        
      // bind the users that come back to vm.users
      $scope.games = data;
    });

})

.service("httpDataLoader", ["$http", function($http) {
  this.load = function() {
    // return $http({url: "assets/dataFile.json"});
    return $http.get("assets/dataFile.json");
  }
  this.test = function() {
    console.log('yo doodz');
  }
}]);
