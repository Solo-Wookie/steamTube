angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

  $routeProvider

    // home page route
    .when('/', {
      templateUrl : 'app/views/pages/home.html',
      controller: 'mainController'
    })
    .when('/game/:id', {
      templateUrl : 'app/views/pages/game.html',
      controller: 'gameController'
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
// .service("httpDataLoader", ["$http", function($http) {
//   this.load = function() {
//     return $http({url: "assets/dataFile.json"});
//   }
//   this.test = function() {
//     console.log('yo doodz');
//   }
// }]);