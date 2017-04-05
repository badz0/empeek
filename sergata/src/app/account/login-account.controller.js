(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$cookies', '$state', '$location', 'accountService'];
    /* @ngInject */
    function LoginController($cookies, $state, $location, accountService) {
        var vm = this;
        vm.credentials = {
            email: "r@sergata.com",
            password: "123456"
        };

        vm.login = login;
        
        function login(credentials) {
            var postData = {
                "username": credentials.email,
                "password": credentials.password
            };

            var config = {
                headers: {
                    //"dns_prefix": $location.host().split('.')[0]
                    "dns_prefix": "test"
                }
            };

            return accountService.login(postData, config).then(success);

            function success(response) {
                if (response) {
                    $cookies.put("valid_user", true);
                    $cookies.put("dns_prefix", response.data.dns_prefix);
                    $cookies.put("application_host", response.data.application_host);
                    $state.go("dashboard");
                    return true;
                }
                vm.error = true;
            }
        }
    }
})();
