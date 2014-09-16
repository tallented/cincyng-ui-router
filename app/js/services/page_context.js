angular.module("app")
  .factory("PageContext", function ($rootScope) {
    var page = {
      title: null,
      meta: {},

      reset: function () {
        page.title = 'UI-Router Demo';
        page.meta = {};
      },

      addMeta: function (value) {
        if (value) {
          angular.extend(page.meta, value);
        }
      }
    };

    // Init and set the page to the scope
    page.reset();
    $rootScope.page = page;

    return page;
  });