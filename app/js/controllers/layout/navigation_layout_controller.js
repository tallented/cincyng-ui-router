angular.module("app").controller("NavigationLayoutContainer", function($scope, $localStorage) {
  $scope.hideAlert = $localStorage.hideAlert;

  $scope.closeAlert = function() {
    $scope.hideAlert = true;
    $localStorage.hideAlert = true;
  };
});