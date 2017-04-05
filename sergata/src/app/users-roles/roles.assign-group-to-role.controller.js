(function () {
    'use strict';

    angular
        .module('app.users-roles')
        .controller('AssignGroupToRoleController', AssignGroupToRoleController);

    AssignGroupToRoleController.$inject = ['$uibModalInstance', 'rolesService', 'groupsService', 'selectedRole', 'roles', 'helpers'];
    /* @ngInject */
    function AssignGroupToRoleController($uibModalInstance, rolesService, groupsService, selectedRole, roles, helpers) {

        var vm = this;
        vm.selectedRole = selectedRole;
        vm.roles = roles;

        vm.assignGroupToRole = assignGroupToRole;
        vm.cancel = cancel;

        activate();

        function activate() {
            getGroups();
        }

        function getGroups() {
            return groupsService.getGroups().then(function (data) {
                vm.groups = _.filter(data, function (object) {
                    return !_.findWhere(vm.selectedRole.groups, {id: object.id});
                });
                return vm.groups;
            });
        }

        function assignGroupToRole(role_id, group_id, group) {
            if(vm.groups.length){
                return rolesService.assignGroupToRole(role_id, group_id).then(function () {
                    var index = helpers.findIndexOfArray(vm.selectedRole.groups, 'id', group_id);
                    if (index === -1) {
                        var newGroup = {
                            id: group_id,
                            name: group.name
                        };
                        vm.selectedRole.groups.push(newGroup);
                    }
                    $uibModalInstance.close(group);
                });
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancelled');
        }
    }
})();


