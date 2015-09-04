angular.module('mainCtrl', [])
  
// .controller('mainController', function($rootScope, $location, Auth) {
.controller('mainController', function($scope, httpDataLoader) {

  $scope.blah = httpDataLoader.load();

  $scope.blah.then(function(response){
    console.log("success", response);
    $scope.games = response.data;
    // debugger
  }, function(response){
    console.log('error')
  });

// var vm = this;
// vm.blah = httpDataLoader.load();

// vm.blah.then(function(response){
//   console.log("success", response);
//   vm.games = response.data;
//   // debugger
// }, function(response){
//   console.log('error')
// });



  // vm.blah = "Hello Everyone";

  // //get info if a person is logged in
  // vm.loggedIn = Auth.isLoggedIn();

  // //check to see if a user is logged in on every request
  // $rootScope.$on('routeChangeStart', function() {
  //   vm.loggedIn = Auth.isLoggedIn();

  //   //get user information
  //   Auth.getUser()
  //     .success(function(data) {
  //       vm.user = data;
  //     });
  //   });

  // //function to handle login form
  // vm.doLogin = function() {

  //   vm.processing = true;
  //   // clear the error
  //   vm.error = '';

  //   //call the Auth.login() function
  //   Auth.login(vm.loginData.username, vm.loginData.password)
  //     .success(function(data) {
  //       vm.processing = false;

  //       //if a user successfully logs in, redirect to users page
  //       if(data.success) {
  //         $location.path('/users');         
  //       } else {
  //         vm.error = data.message;
  //       }
  //     });
  // }

  // //function to handle logging out
  // vm.doLogout = function() {
  //   Auth.logout();
  //   //reset all user info
  //   vm.user = {};
  //   $location.path('/login');
  // };
});
