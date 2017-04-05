(function () {
    'use strict';

    angular
        .module('app.users-roles')
        .controller('AssignUserToRoleController', AssignUserToRoleController);

    AssignUserToRoleController.$inject = ['$uibModalInstance', 'rolesService', 'groupsService', 'selectedRole', 'roles', 'helpers'];
    /* @ngInject */
    function AssignUserToRoleController($uibModalInstance, rolesService, groupsService, selectedRole, roles, helpers) {

        var vm = this;
        vm.selectedRole = selectedRole;
        vm.roles = roles;

        vm.assignUserToRole = assignUserToRole;
        vm.cancel = cancel;

        activate();

        function activate() {
            getUsers();
        }

        function getUsers() {
            return groupsService.getUsers().then(function (data) {
                vm.users = _.filter(data, function (object) {
                    return !_.findWhere(vm.selectedRole.users, {id: object.id});
                });
                return vm.users;
            });
        }

        function assignUserToRole(role_id, user_id, user) {
            if(vm.users.length){
                return rolesService.assignUserToRole(role_id, user_id).then(function () {
                    var index = helpers.findIndexOfArray(vm.selectedRole.users, 'user_id', user_id);
                    if (index === -1) {
                        vm.selectedRole.users.push(user);
                    }
                    $uibModalInstance.close(user);
                });
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancelled');
        }
    }
})();
