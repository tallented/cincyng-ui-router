console.log("execute app.js");
angular.module("app",
  [
    "ngStorage",
    "ui.bootstrap",
    "ui.router"
  ])
  .run(function ($rootScope, $state, $stateParams, SecurityContext) {
    // adds some basic utilities to the $rootScope for debugging purposes
    $rootScope.log = function (thing) {
      console.log(thing);
    };

    $rootScope.alert = function (thing) {
      alert(thing);
    };

    // Set up Root Scope state and auth management
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.isLoggedIn = SecurityContext.isLoggedIn;
  })
  .controller("AppController", function($rootScope, $scope, $state, SecurityContext, $log) {
    $rootScope.logout = function() {
      $log.debug("You have logged out");

      SecurityContext.clear();
      $state.go("home", { reload: true });
    };
  });