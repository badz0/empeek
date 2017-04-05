(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$state', '$rootScope', 'routerHelper', 'layoutService', 'logger', 'authService'];
    /* @ngInject */
    function SidebarController($state, $rootScope, routerHelper, layoutService, logger, authService) {
        var vm = this;
        var states = routerHelper.getStates();

        vm.notifications = {};
        vm.isAllowed = isAllowed;

        vm.isCurrent = isCurrent;
        $rootScope.getNotifications = getNotifications;

        activate();

        function activate() {
            getNavRoutes();
            $rootScope.$on('$stateChangeStart', getNotifications);
        }

        function getNotifications() {
            if (authService.isLoggedIn()) {
                layoutService.getNotifications().then(function (data) {
                    vm.notifications = data;
                    return vm.notifications;
                });
            }
        }

        function getNavRoutes() {
            vm.navRoutes = states.filter(function (r) {
                return r.settings && r.settings.nav;
            }).sort(function (r1, r2) {
                return r1.settings.nav - r2.settings.nav;
            });
        }

        function isCurrent(route) {
            if (!route.name || !$state.current || !$state.current.name) {
                return '';
            }

            var menuName = route.name;
            return $state.current.name.substr(0, menuName.length) === menuName ? 'current' : '';
        }

        function isAllowed(name) {
            name = (name === "users-roles")?"user_management":name.replace('-', '_');
            return authService.user.menu[name];
        }
    }
})();
