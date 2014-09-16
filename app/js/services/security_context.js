angular.module("app").factory('SecurityContext', function ($rootScope) {
    var factory = {
        username: null,
        authToken: null,

        login: function(username) {
          factory.username = username;
        },

        isLoggedIn: function() {
            return factory.username != null;
        },

        clear: function() {
            // Reset the values
            factory.username = null;
        }
    };

    $rootScope.principal = factory;
    return factory;
});