angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

  $routeProvider

    // home page route
    .when('/', {
      templateUrl : 'app/views/pages/home.html',
      controller: 'mainController',
      controllerAs: 'home',
      resolve : {
        scrape: ["httpDataLoader", function(httpDataLoader){
          return httpDataLoader.load();
        }]
      }
    })

    // // login page
    // .when('/login', {
    //   templateUrl : 'app/views/pages/login.html',
    //     controller  : 'mainController',
    //     controllerAs: 'login'
    // })

  //get rid of the hash in the URL
  $locationProvider.html5Mode(true);
  
})
.service("httpDataLoader", ["$http", function($http) {
  this.load = function() {
    return $http({url: "assets/dataFile.json"});
  }
  this.test = function() {
    console.log('yo doodz');
  }
}]);