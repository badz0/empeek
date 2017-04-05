(function() {
    'use strict';

    angular
        .module('app.account')
        .factory('accountService', accountService);
    
    /* @ngInject */
    function accountService($http, $q, apiBaseUrl, exception, constants) {
        var service = {
            login: login,
            logout: logout,
            getUser: getUser
        };

        return service;

        function login(postData, config) {
            return $http.post(apiBaseUrl + constants.apiUrls.login, postData, config)
                .then(success)
                .catch(fail);

            function success(response) {
                return (response)?response.data:false;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function logout() {
            return $http.get(apiBaseUrl + constants.apiUrls.logout)
                .then(success)
                .catch(fail);

            function success(response) {
                return response;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function getUser() {
            return $http.get(apiBaseUrl + constants.apiUrls.users + "/self")
                .then(success)
                .catch(fail);

            function success(response) {
                response.data.data.valid = true;
                response.data.data.menu.dashboard=true;
                response.data.data.menu.events=true;
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }
    }
})();
