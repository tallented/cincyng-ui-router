angular.module("app").factory('SecurityContext', function ($rootScope, $localStorage) {
  var factory = {
    authToken: null,

    login: function (username) {
      $localStorage.username = username;
      $localStorage.loggedIn = true;
    },

    getUsername: function() {
      return $localStorage.username;
    },

    isLoggedIn: function () {
      return $localStorage.loggedIn;
    },

    clear: function () {
      // Reset the values
      $localStorage.username = null;
      $localStorage.loggedIn = false;
    }
  };

  $rootScope.principal = factory;
  return factory;
});