(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('LogoutController', LogoutController);

    LogoutController.$inject = ['$cookies', '$state', 'authService', 'accountService'];
    /* @ngInject */
    function LogoutController($cookies, $state, authService, accountService) {
        var vm = this;
        vm.isAuthenticated = isAuthenticated;
        vm.userDetails = getDetails;
        vm.logout = logout;


        function logout() {
            return accountService.logout().then(success);

            function success() {
                $cookies.remove("valid_user");
                authService.reset();
                $state.go("login");

                return true;
            }
        }

        function isAuthenticated() {
            return authService.user.valid;
        }

        function getDetails() {
            return authService.user;
        }
    }
})();
