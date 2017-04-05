(function () {
    'use strict';

    angular
        .module('app.users-roles')
        .controller('AssignUserController', AssignUserController);

    AssignUserController.$inject = ['$uibModalInstance', 'groupsService', 'selectedGroup', 'groups', 'helpers'];
    /* @ngInject */
    function AssignUserController($uibModalInstance, groupsService, selectedGroup, groups, helpers) {

        var vm = this;
        vm.selectedGroup = selectedGroup;
        vm.groups = groups;

        vm.assignUser = assignUser;
        vm.cancel = cancel;

        activate();

        function activate() {
            getUsers();
        }

        function getUsers() {
            return groupsService.getUsers().then(function (data) {
                vm.users = _.filter(data, function (object) {
                    return !_.findWhere(vm.selectedGroup.user, {id: object.id});
                });
                return vm.users;
            });
        }

        function assignUser(group_id, user_id, user) {
            if(vm.users.length){
                return groupsService.addUserToGroup(group_id, user_id).then(function () {
                    var index = helpers.findIndexOfArray(vm.selectedGroup.user, 'id', user.id);
                    if (index === -1) {
                        vm.selectedGroup.user.push(user);
                    }
                    $uibModalInstance.close(group_id);
                });
            }
        }

        function cancel() {
            $uibModalInstance.dismiss('cancelled');
        }
    }
})();

