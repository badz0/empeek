(function () {
    'use strict';

    angular
        .module('app.users-roles')
        .directive('iconsPermissions', iconsPermissions);

    iconsPermissions.$inject = ['_'];
    /* @ngInject */
    function iconsPermissions(_) {
        var directive = {
            templateUrl: '/app/users-roles/roles.icons-permissions.html',
            link: link,
            controller: 'IconsPermissionsController',
            controllerAs: 'iconsPerVm',
            scope: {
                iconsPermissions: '@',
                permissionsArray: '=',
                editMode: '@',
                titleName: '@'
            },
            bindToController: true,
            replace: true,
            restrict: 'A'
        };
        return directive;


        function link(scope, element, attrs, controller) {

            function setValues(permission) {
                controller.access_level = permission.access_level;
                controller.notify = permission.notify;
            }

            function getPermissionObject() {
                return _.find(controller.permissionsArray, function (item) {
                    return item[controller.iconsPermissions];
                });
            }

            function updatePermission(newArray, oldArray) {
                if (!angular.equals(newArray, oldArray)) {
                    controller.permissionObject = getPermissionObject();
                    setValues(controller.permissionObject[controller.iconsPermissions]);
                }
            }

            scope.$watchCollection('iconsPerVm.permissionsArray',updatePermission);

            controller.permissionObject = getPermissionObject();

            if (controller.permissionObject) {
                setValues(controller.permissionObject[controller.iconsPermissions]);
            }
            else {
                controller.permissionObject = {};

                controller.permissionObject[controller.iconsPermissions] = {
                    "access_level": 0,
                    "notify": false
                };
                controller.permissionsArray.push(controller.permissionObject);
            }
        }
    }
})();

