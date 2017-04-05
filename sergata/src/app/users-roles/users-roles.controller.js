(function () {
    'use strict';

    angular
        .module('app.users-roles')
        .controller('UsersRolesController', UsersRolesController);

    UsersRolesController.$inject = ['$q', '$state', 'routerHelper'];
    /* @ngInject */
    function UsersRolesController($q, $state, routerHelper) {
        var vm = this;
        var states = routerHelper.getStates();
        vm.isCurrent = isCurrent;

        activate();

        function activate() {
            getTabRoutes();
        }

        function getTabRoutes() {
            vm.tabRoutes = states.filter(function (r) {
                return r.tabSettings && r.tabSettings.tab;
            }).sort(function (r1, r2) {
                return r1.tabSettings.tab - r2.tabSettings.tab;
            });
        }

        function isCurrent(route) {
            if (!route.tabSettings || !$state.current.tabSettings) {
                return '';
            }

            return $state.current.tabSettings.tab === route.tabSettings.tab ? 'active' : '';
        }
    }
})();
