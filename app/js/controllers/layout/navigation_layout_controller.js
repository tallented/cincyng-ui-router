angular.module("app").controller("NavigationLayoutContainer", function($scope, $state) {
  $scope.showAlert = true;

  $scope.closeAlert = function() {
    $scope.showAlert = false;
  };

//  $scope.logout = function() {
//    window.alert('Logging out');
//  }
});