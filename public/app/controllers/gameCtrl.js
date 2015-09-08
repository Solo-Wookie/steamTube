angular.module('gameCtrl', ['gameService'])

.controller('gameController', function($scope, $location, Game, $routeParams) {
  $scope.game = $routeParams.id
  Game.get($routeParams.id)
    .success(function(data) {
      $scope.image = data.image
      $scope.name = data.name
      $scope.price = data.price
      $scope.link = data.link
    })

})

