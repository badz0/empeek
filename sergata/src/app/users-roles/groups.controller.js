(function () {
    'use strict';

    angular
        .module('app.users-roles')
        .controller('GroupsController', GroupsController);

    GroupsController.$inject = ['$q', '$uibModal', 'groupsService',  'helpers'];
    /* @ngInject */
    function GroupsController($q, $uibModal, groupsService, helpers) {
        var vm = this;
        vm.groups = [];

        vm.openAddGroupModal = openAddGroupModal;
        vm.openAssignUserModal = openAssignUserModal;
        vm.removeUserFromGroup = removeUserFromGroup;
        vm.deleteGroup = deleteGroup;
        vm.selectGroup = selectGroup;
        vm.getGroup = getGroup;
        vm.refreshGroups = refreshGroups;
        vm.refreshGroup = refreshGroup;

        activate();

        function activate() {
            var promises = [getGroups()];
            return $q.all(promises).then(function () {
            });
        }

        function getGroups() {
            return groupsService.getGroups().then(function (data) {
                vm.groups = data;
                delete vm.selectedGroup;
                return vm.groups;
            });
        }

        function refreshGroups(){
            getGroups();
            delete vm.selectedGroup;
        }

        function openModal(name, saveCallback, resolve) {
            resolve = resolve || {};
            var modal = {
                addGroup: {
                    templateUrl: '/app/users-roles/groups.add-group-modal.html',
                    controller: 'AddGroupController',
                    controllerAs: 'addGroupVm'
                },
                assignUser: {
                    templateUrl: '/app/users-roles/groups.assign-user-modal.html',
                    controller: 'AssignUserController',
                    controllerAs: 'assignUserVm',
                    resolve: resolve
                }
            };

            var modalInstance = $uibModal.open(modal[name]);

            if (angular.isFunction(saveCallback)) {
                modalInstance.result.then(saveCallback);
            }
        }

        function openAddGroupModal() {
            openModal('addGroup', refreshGroups);
        }

        function openAssignUserModal() {
            var resolve = {
                selectedGroup: function () {
                    return vm.selectedGroup;
                },
                groups: function(){
                    return vm.groups;
                }
            };
            function save(group_id) {
                var index = helpers.findIndexOfArray(vm.groups, 'id', group_id);
                if (index != -1) {
                    vm.groups[index].users_in_group++;
                }


            }

            openModal('assignUser', save, resolve);
        }

        function deleteGroup(groupId) {
            if (confirm("Do you want delete this group?")) {
                return groupsService.deleteGroup(groupId).then(function () {
                    var index = helpers.findIndexOfArray(vm.groups, 'id', groupId);
                    if (index != -1) {
                        vm.groups.splice(index, 1);
                        delete vm.selectedGroup;
                        return true;
                    }
                });
            }
        }

        function selectGroup(groupId) {
            if (!vm.selectedGroup || vm.selectedGroup.id != groupId) {
                var promises = [getGroup(groupId)];

                return $q.all(promises).then(function (/*data*/) {
                });
            }
        }

        function getGroup(groupId) {
            return groupsService.getGroup(groupId).then(function (data) {
                vm.selectedGroup = data;
                return vm.selectedGroup;
            });
        }

        function refreshGroup(groupId){
            //check when have api
            selectGroup(groupId);
            getGroup(groupId);
        }

        function removeUserFromGroup(groupId, userId, index) {
            if (confirm("Do you want remove this user from group?")) {
                var userIndex = index;
                return groupsService.removeUserFromGroup(groupId, userId).then(function () {
                    vm.selectedGroup.user.splice(userIndex, 1);
                    var groupIndex = helpers.findIndexOfArray(vm.groups, 'id', groupId);
                    if (groupIndex != -1) {
                        vm.groups[groupIndex].users_in_group--;
                        return true;
                    }
                });
            }
        }
    }
})();
