(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('TopmenubarController', TopmenubarController);

    TopmenubarController.$inject = ['$state', '$rootScope', 'authService'];
    /* @ngInject */
    function TopmenubarController($state, $rootScope, authService) {
        var vm = this;
        
        vm.title = ''
        vm.isAllowed = false;

        activate();

        function activate() {
            update();
            $rootScope.$on('$stateChangeSuccess', update);
        }

        function update() {
            if (authService.isLoggedIn()) {
                vm.title = $state.current.title;
                vm.isAllowed = true;
            }
            else {
                vm.title = '';
                vm.isAllowed = false;
            }
        }
    }
})();
