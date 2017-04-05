(function () {
    'use strict';

    angular
        .module('app.users-roles')
        .controller('UsersAssignUserController', UsersAssignUserController);

    UsersAssignUserController.$inject = ['$uibModalInstance', 'usersService', 'selectedUser', 'allGroups', '_'];

    /* @ngInject */
    function UsersAssignUserController($uibModalInstance, usersService, selectedUser, allGroups, _) {
        var vm = this;

        vm.user = selectedUser;
        vm.allgroups = [];

        vm.closeModal = closeModal;
        vm.assignGroup = assignGroup;

        activate();

        ////////////////

        function activate() {
            filterGroup(allGroups);
        }

        function filterGroup(data) {
            vm.allgroups = _.filter(data, function (object) {
                return !_.find(selectedUser.groups, function (num) {
                    return num.id === object.id;
                });
            });
        }


        function assignGroup() {
            return usersService.addUserToGroup(vm.group_id, selectedUser.id).then(function (/*data*/) {
                $uibModalInstance.close(vm.group_id);
            });
        }

        function closeModal() {
            $uibModalInstance.dismiss('cancel');
        }
    }

})();


