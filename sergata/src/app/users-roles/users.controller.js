(function () {
    'use strict';

    angular
        .module('app.users-roles')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$q', '$uibModal', '_', 'usersService', 'helpers'];
    /* @ngInject */
    function UsersController($q, $uibModal, _, usersService, helpers) {
        var vm = this;

        vm.users = [];
        vm.groups = [];
        vm.editingUser = {};

        vm.getUserDetail = getUserDetail;
        vm.getUsers = getUsers;
        vm.selectUser = selectUser;
        vm.editUser = editUser;
        vm.deleteUser = deleteUser;
        vm.saveEditingUser = saveEditingUser;
        vm.cancelEditing = cancelEditing;
        vm.openAddUserModal = openAddUserModal;
        vm.openAssignUserModal = openAssignUserModal;
        vm.getDetails = getDetails;
        vm.removeUserFromGroups = removeUserFromGroups;
        vm.filterGroup = filterGroup;

        activate();

        function activate() {
            var promises = [getUsers(), getGroups()];
            return $q.all(promises).then(function () {
            });
        }

        function getUsers() {
            return usersService.getUsers().then(function (data) {
                vm.users = data;
                delete vm.selectedUser;
                return vm.users;
            });
        }

        function filterGroup(value) {
            if (vm.selectedUser) {
                for (var i in vm.selectedUser.groups) {
                    if (vm.selectedUser.groups[i].id === value.id) {
                        return value;
                    }
                }
            }
        }

        function getGroups() {
            return usersService.getGroups().then(function (data) {
                vm.groups = data;
                return data;
            });
        }

        function selectUser(item) {
            if ((!vm.selectedUser) || (vm.selectedUser.id !== item.id)) {
                getDetails(item.id);
            }
        }

        function getDetails(id) {
            return getUserDetail(id).then(function (user) {
                vm.selectedUser = user;
                vm.showEditing = false;
            });
        }

        function getUserDetail(id) {
            return usersService.getDetails(id).then(function (data) {
                return data;
            });
        }

        function editUser() {
            vm.editingUser = angular.copy(vm.selectedUser);
            vm.editingUser.confirm_password = "";
            vm.showEditing = true;
        }

        function deleteUser() {
            if (confirm("Do you want delete this user?")) {
                return usersService.deleteUser(vm.selectedUser.id).then(function (/*data*/) {
                    var index = helpers.findIndexOfArray(vm.users, 'id', vm.selectedUser.id);
                    if (index != -1) {
                        vm.users.splice(index, 1);
                        delete vm.selectedUser;
                        return true;
                    }
                });
            }
        }

        function saveEditingUser() {
            var model = {
                id: vm.editingUser.id,
                name: vm.editingUser.name,
                password: vm.editingUser.password && vm.editingUser.password.length ? vm.editingUser.password : undefined,
                is_admin: vm.editingUser.is_admin
            };

            return usersService.updateUser(vm.selectedUser.id, model).then(function (/*data*/) {
                var index = helpers.findIndexOfArray(vm.users, 'id', vm.selectedUser.id);
                if (index != -1) {
                    model.password = "";
                    vm.selectedUser = _.extend(vm.selectedUser, model);
                    vm.users[index] = _.extend(vm.users[index], model);
                    vm.showEditing = false;
                    delete vm.editingUser;
                    return vm.selectedUser;
                }
                return false;
            });
        }

        function cancelEditing() {
            vm.showEditing = false;
            delete vm.editingUser;
        }

        function openModal(name, saveCallback, resolve) {
            resolve = resolve || {};
            var modal = {
                addUser: {
                    templateUrl: '/app/users-roles/users.add-user-modal.html',
                    controller: 'AddUserController',
                    controllerAs: 'addUserVm',
                    resolve: resolve
                },
                assignUser: {
                    templateUrl: '/app/users-roles/users.assign-user-modal.html',
                    controller: 'UsersAssignUserController',
                    controllerAs: 'assignUserVm',
                    resolve: resolve
                }
            };

            var modalInstance = $uibModal.open(modal[name]);

            if (angular.isFunction(saveCallback)) {
                modalInstance.result.then(saveCallback);
            }
        }

        function openAddUserModal() {
            openModal('addUser', getUsers);
        }

        function openAssignUserModal() {
            var resolve = {
                selectedUser: function () {
                    return vm.selectedUser;
                },
                allGroups: function () {
                    return vm.groups;
                }
            };

            function save(group_id) {
                vm.selectedUser.groups.push({id: group_id});
            }

            openModal('assignUser', save, resolve);
        }

        function removeUserFromGroups(group_id) {
            if (confirm("Do you want remove user from this group?")) {
                return usersService.removeUserFromGroup(group_id, vm.selectedUser.id).then(function (/*data*/) {
                    var index = _.findIndex(vm.selectedUser.groups, function (x) {
                        return x.id == group_id;
                    });
                    if (index != -1) {
                        vm.selectedUser.groups.splice(index, 1);
                        return true;
                    }
                })
            }
        }
    }
})();
