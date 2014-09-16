angular.module("app").config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
  console.log("Initializing ui-router");

  $locationProvider.html5Mode(true);

  // Un-matched URLs redirect to /not-found
  $urlRouterProvider.otherwise("/not-found");

  $stateProvider
    //
    // Top-level Layouts
    //
    .state('navigation-layout', {
        abstract: 'true',
        templateUrl: "layout/navigation_layout.html",
        controller: "NavigationLayoutContainer"
    })
    .state('blank-layout', {
        abstract: 'true',
        templateUrl: "layout/blank_layout.html"
    })

    //
    // Home Pages
    //
    .state('home', {
      url: "/?utm_medium&utm_source&utm_campaign&utm_content&utm_term",
      onEnter: ["$state", "$stateParams", "SecurityContext", function ($state, $stateParams, SecurityContext) {
        var params = {
          utm_medium: $stateParams.utm_medium,
          utm_source: $stateParams.utm_source,
          utm_campaign: $stateParams.utm_campaign,
          utm_content: $stateParams.utm_content,
          utm_term: $stateParams.utm_term
        };

        if (SecurityContext.isLoggedIn()) {
          $state.go('home-logged-in', params, { reload: true });
        } else {
          $state.go('home-logged-out', params, { reload: true });
        }
      }]
    })
    .state('home-logged-in', {
      url: '/logged-in',
      parent: 'navigation-layout',
      templateUrl: 'home/home_logged_in.html',
      data: {
        auth: true
      }
    })
    .state('home-logged-out', {
      url: '/welcome?utm_medium&utm_source&utm_campaign&utm_content&utm_term',
      parent: 'blank-layout',
      templateUrl: 'home/home_logged_out.html'
    })

    //
    // Login and Registration
    //
    .state('login', {
      url: "/login",
      templateUrl: 'login.html',
      controller: 'LoginController',
      data: {
        modal: {
          windowClass: 'login-modal'
        }
      }
    })

    //
    // Error Pages
    //
    .state('404', {
      url: '/not-found',
      parent: 'blank-layout',
      templateUrl: 'error/404.html',
      data: {
        page: {
          title: 'Page Not Found',
          meta: {
            'prerender-status-code': '404'
          }
        }
      }
    })

  ;

});
