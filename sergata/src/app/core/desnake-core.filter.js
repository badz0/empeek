(function() {
    'use strict';

    angular
        .module('app.core')
        .filter('desnake', desnake);

    function desnake() {
        return function(input) {
            return input.charAt(0).toUpperCase() + input.substr(1).replace(/_([a-zA-Z])/g, function(match, p1) { 
           		return ' ' + p1.toUpperCase(); 
            });
        }
    }

})();
