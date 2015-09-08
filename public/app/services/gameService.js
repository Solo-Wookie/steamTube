angular.module('gameService', [])

.factory('Game', function($http) {

  // create a new object
  var gameFactory = {};

  // get a single game
  gameFactory.get = function(id) {
    return $http.get('/api/games/' + id);
  };

  // get all games
  gameFactory.all = function() {
    return $http.get('/api/games/');
  };

  // create a game
  gameFactory.create = function(gameData) {
    return $http.post('/api/games/', gameData);
  };

  // update a game
  gameFactory.update = function(id, gameData) {
    return $http.put('/api/games/' + id, gameData);
  };

  // delete a game
  gameFactory.delete = function(id) {
    return $http.delete('/api/games/' + id);
  };

  // return our entire gameFactory object
  return gameFactory;

});