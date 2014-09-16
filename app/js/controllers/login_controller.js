angular.module("app").controller('LoginController', function($rootScope, $scope, $state, $timeout, SecurityContext) {
  $scope.credentials = {
    username: "",
    password: ""
  };

  $scope.login = function() {
    // Fake the login and set the username on the security context
    SecurityContext.login($scope.credentials.username);

    // Check for a pre-login state
    // This must be done before closing the modal which might cause a state change
    var preLoginState = $rootScope.preLoginState;

    // Close the login modal
    $scope.$close();

    // Determine if there was a state prior to the login... if so we are going to return to it
    // otherwise head back to the home page
    // The $timeout is used with a time of zero to execute this check immediately after the modal is closed
    $timeout(function() {
      if (preLoginState) {
        console.log('Found pre login state ' + preLoginState.toState);
        $state.go(preLoginState.toState, preLoginState.toParams);
      } else {
        $state.go('home', {}, { reload: true });
      }
    });
  };
});
