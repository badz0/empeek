(function() {
  'use strict';

  var app = angular.module('app.widgets', []);

  app.filter('encodeURIComponent', function($window) {
    return $window.encodeURIComponent;
  });

})();
