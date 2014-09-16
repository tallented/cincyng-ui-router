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
      url: '/logged-in?utm_medium&utm_source&utm_campaign&utm_content&utm_term',
      parent: 'navigation-layout',
      templateUrl: 'pages/home_logged_in.html',
      data: {
        auth: true
      }
    })
    .state('home-logged-out', {
      url: '/welcome?utm_medium&utm_source&utm_campaign&utm_content&utm_term',
      parent: 'blank-layout',
      templateUrl: 'pages/home_logged_out.html'
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
    // Pages
    //
    .state('authenticated-page', {
      url: '/authenticated-page',
      parent: 'navigation-layout',
      templateUrl: 'pages/authenticated_page.html',
      data: {
        auth: true
      }
    })
    .state('modals', {
      url: '/modals',
      parent: 'navigation-layout',
      templateUrl: 'pages/modals.html',
      data: {
        auth: true
      }
    })

    //
    // Modals
    //
    .state('modal-with-url', {
      url: "/modal-with-url",
      templateUrl: 'modal/modal_with_url.html',
      data: {
        modal: true
      }
    })

    .state('modal-requiring-auth', {
      url: '/modal-requiring-auth',
      templateUrl: 'modal/modal_requiring_auth.html',
      data: {
        modal: true,
        auth: true
      }
    })

    .state('modal-with-controller', {
      templateUrl: 'modal/modal_with_controller.html',
      controller: 'ModalWithController',
      data: {
        modal: true
      }
    })

    .state('modal-with-options', {
      templateUrl: 'modal/modal_with_options.html',
      data: {
        modal: {
          windowClass: 'modal-with-options-modal',
          size: 'sm',
          backdrop: 'static'
        }
      }
    })

    .state('modal-parent', {
      templateUrl: 'modal/modal_parent.html',
      data: {
        modal: {
          size: 'lg'
        }
      }
    })

    .state('modal-child', {
      templateUrl: 'modal/modal_child.html',
      data: {
        modal: true
      }
    })

    .state('modal-closing-others', {
      templateUrl: 'modal/modal_closing_others.html',
      data: {
        modal: true,
        closePriorModal: true
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
