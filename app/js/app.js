console.log("execute app.js");
angular.module("app",
  [
    "ui.bootstrap",
    "ui.router"
  ])
  .run(function ($rootScope, $state, $stateParams, $modal, SecurityContext, PageContext) {
    // adds some basic utilities to the $rootScope for debugging purposes
    $rootScope.log = function(thing) {
      console.log(thing);
    };

    $rootScope.alert = function (thing) {
      alert(thing);
    };

    // Set up Root Scope state and auth management
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.isLoggedIn = SecurityContext.isLoggedIn;

    //
    // WEB CLIENT ROUTE HANDLING
    //

    // Watch for states requiring user to be authenticated
    // And track open modals by state
    var modalByStateName = {};
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      console.log('State Change: ' + toState.name);

      var handled = false;
      if (toState.data && toState.data.auth && !SecurityContext.isLoggedIn()) {
        console.log('State requires authentication: ' + toState.name);
        $rootScope.preLoginState = {
          toState: toState.name,
          toParams: toParams
        };

        event.preventDefault();
        handled = true;

        // If the user if trying to go to a logged in state, and they either weren't on a state
        // or are coming from a logged in state but have lost their authentication... show login
        $state.go('login');
      } else if (toState.name !== 'login') {
        console.log('Clear pre login state: ' + toState.name);
        delete $rootScope.preLoginState;
      }

      // Launch the state as a modal if configured in ui_router.js
      // Prevent a modal for a state from being opened twice
      if (!handled && toState.data && toState.data.modal) {
        if (!modalByStateName[toState.name]) {
          console.log('launch modal for state: ' + toState.name);
          event.preventDefault();
          handled = true;

          // Close prior modals
          if (toState.data.closePriorModal) {
            _.each(_.keys(modalByStateName), function(key) {
              if (_.has(modalByStateName, key)) {
                var modal = modalByStateName[key].close();
              }
            });
          }

          var modalConfig = {
            templateUrl: toState.templateUrl,
            controller: toState.controller,
            resolve: {
              '$modalState': function() { return toState; }
            }
          };

          if (typeof toState.data.modal === 'object') {
            angular.extend(modalConfig, toState.data.modal);
          }

          // Open the modal and flag it as opened
          var modal = $modal.open(modalConfig);
          modalByStateName[toState.name] = modal;

          // Regardless of the modal result, flag it as closed
          modal.result.then(function() {
            delete modalByStateName[toState.name];
            if ($state.is('')) {
              $state.go('home');
            }
          }, function() {
            delete modalByStateName[toState.name];
            if ($state.is('')) {
              $state.go('home');
            }
          });
        } else {
          // Modal is already open for this state... cancel the state change
          event.preventDefault();
        }
      } else {
        // Reset the Page
        PageContext.reset();

        // Check for page level definition
        if (toState.data && toState.data.page) {
          if (toState.data.page.title) {
            PageContext.title = toState.data.page.title;
          }

          if (toState.data.page.meta) {
            PageContext.addMeta(toState.data.page.meta);
          }
        }
      }
    });
  })
  .controller("AppController", function($rootScope, $scope, $state, SecurityContext, $log) {
    $rootScope.logout = function() {
      $log.debug("You have logged out");

      SecurityContext.clear();
      $state.go("home", { reload: true });
    };
  });