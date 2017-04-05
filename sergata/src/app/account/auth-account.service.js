(function() {
    'use strict';

    angular
        .module('app.account')
        .factory('authService', authService);

    authService.$inject = ['$cookies', 'accountService'];
    /* @ngInject */
    function authService($cookies, accountService) {

        var loggedIn = false;
        var service = {
            user: {},
            isLoggedIn: isLoggedIn,
            reset: reset
        };

        init();

        return service;

        function isLoggedIn() {
            var valid_user = $cookies.get("valid_user");
            if (typeof valid_user == "undefined") {
                loggedIn = false;
            } else {
                loggedIn = true;
                if (!service.user.valid)
                    getUserDetails();
            }
            return loggedIn;
        }

        function getUserDetails() {
            accountService.getUser().then(success);

            return loggedIn;

            function success(data) {
                if (typeof data !== "undefined") {
                    service.user = data;
                    loggedIn = true;
                } else
                    loggedIn = false;
                return loggedIn;
            }
        }

        function reset() {
            service.user = {
                valid: false,
                name: "Anonymous",
                menu: {
                    "feeders": false,
                    "clusters": false,
                    "sources": false,
                    "adaptive_channels": false,
                    "publishing_targets": false,
                    "delivery_channels": false,
                    "user_management": false,
                    "settings": false,
                    "domains": false
                }
            };
        }

        function init() {
            reset();
        }
    }
})();
