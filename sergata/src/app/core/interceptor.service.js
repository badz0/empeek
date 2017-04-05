(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('interceptorService', interceptorService);

    interceptorService.$inject = ['$cookies', '$location', '$q'];
    /* @ngInject */
    function interceptorService($cookies, $location, $q) {

        var interceptor = {
            'responseError': function (rejection) {
                if (rejection.status === 401) {
                    $cookies.put("valid_user", {expire: 0});
                    $cookies.remove("valid_user");
                    $location.url("/login");
                    return;
                }
                return $q.reject(rejection)
            }
        };

        return interceptor;
    }
})();
