//Work in progress

angular.module('steamService', [])

.factory('Steam', function($http) {

  // $http.defaults.headers.common;
  // create a new object
  var steamFactory = {};

  // get a single game
  steamFactory.authenticate = function() {
    $http.defaults.headers.get = {'Access-Control-Allow-Origin': '*'} ;
    return $http.get('/authenticate');
  };
  // return our entire gameFactory object
  return steamFactory;

});