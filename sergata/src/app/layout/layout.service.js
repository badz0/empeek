(function () {
    'use strict';

    angular
        .module('app.layout')
        .factory('layoutService', layoutService);

    layoutService.$inject = ['$http', '$q', 'exception', 'constants', 'apiBaseUrl'];
    /* @ngInject */
    function layoutService($http, $q, exception, constants, apiBaseUrl) {
        var urls = constants.apiUrls;
        var service = {
            getNotifications: getNotifications
        };

        return service;

        function getNotifications() {
            return $http.get(apiBaseUrl + urls.statuses)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data.result;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }
    }
})();
