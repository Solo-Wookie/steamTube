angular.module('twitchService', [])

.factory('Twitch', function($http) {

  // create a new object
  var twitchFactory = {};

  // get a single twitch
  twitchFactory.get = function(url) {
    return $http.get(url);
  };

  // return our entire twitchFactory object
  return twitchFactory;

});