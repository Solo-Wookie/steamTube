angular.module('twitchService', [])

.factory('Twitch', function($http) {

  // create a new object
  var twitchFactory = {};

  // get a single twitch
  twitchFactory.get = function(url) {
    return $http.get(url);
  };

  // // get all twitchs
  // twitchFactory.all = function() {
  //   return $http.get('/api/twitchs/');
  // };

  // // create a twitch
  // twitchFactory.create = function(twitchData) {
  //   return $http.post('/api/twitchs/', twitchData);
  // };

  // // update a twitch
  // twitchFactory.update = function(id, twitchData) {
  //   return $http.put('/api/twitchs/' + id, twitchData);
  // };

  // // delete a twitch
  // twitchFactory.delete = function(id) {
  //   return $http.delete('/api/twitchs/' + id);
  // };

  // return our entire twitchFactory object
  return twitchFactory;

});