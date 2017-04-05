(function() {
    'use strict';

    angular
        .module('app.core')
        .filter('timestamp', timestamp);

    function timestamp() {
        return function(timestamp) {
          timestamp = parseFloat(timestamp)
          if (isNaN(timestamp))
          	return '';

          function z(n, p) {
          	p = p || 2;
          	return ('0000' + n).slice(-p); 
          }

          var milliseconds = Math.floor(timestamp % 1000);
          var total_seconds = timestamp / 1000;
          var seconds = Math.floor(total_seconds % 60);
          var minutes = Math.floor(total_seconds % 3600 / 60);
          var hours = Math.floor(total_seconds / 3600);

          return (z(hours, Math.max(hours.toString().length, 2)) + ':' + z(minutes) + ':' + z(seconds) + '.' + z(milliseconds, 3));
        }
    }
})();
