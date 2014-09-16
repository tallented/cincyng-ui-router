angular.module("app").factory('SecurityContext', function ($rootScope, $localStorage) {
  var factory = {
    username: null,
    authToken: null,

    login: function (username) {
      factory.username = username;
      $localStorage.loggedIn = true;
    },

    isLoggedIn: function () {
      return $localStorage.loggedIn;
    },

    clear: function () {
      // Reset the values
      factory.username = null;
      $localStorage.loggedIn = false;
    }
  };

  $rootScope.principal = factory;
  return factory;
});