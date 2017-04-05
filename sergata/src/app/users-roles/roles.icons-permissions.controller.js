(function () {
    'use strict';

    angular
        .module('app.users-roles')
        .controller('IconsPermissionsController', IconsPermissionsController);

    IconsPermissionsController.$inject = ['$scope'];
    /* @ngInject */
    function IconsPermissionsController($scope) {

        var vm = this;

        vm.access_level = 0;
        vm.notify = false;

        function setNotify(newVal, oldVal) {
            if (!angular.equals(oldVal, newVal)) {
                vm.permissionObject[vm.iconsPermissions].notify = newVal;
            }
        }

        function setAccessLevel(newVal, oldVal) {
            if (!angular.equals(oldVal, newVal)) {
                vm.permissionObject[vm.iconsPermissions].access_level = newVal;
            }
        }

        if (vm.editMode) {
            $scope.$watch('iconsPerVm.notify', setNotify);
            $scope.$watch('iconsPerVm.access_level', setAccessLevel);
        }
    }
})();
