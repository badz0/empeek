(function () {
    'use strict';

    angular
        .module('app.users-roles')
        .controller('RolesController', RolesController);

    RolesController.$inject = ['$q', '$uibModal', '_', 'rolesService', 'helpers'];
    /* @ngInject */
    function RolesController($q, $uibModal, _, rolesService, helpers) {
        var vm = this;

        vm.roles = [];
        vm.isEditModeEnabled = false;
        vm.resourceTags = [];

        vm.resourceTag = {
            isNew: false,
            id: null,
            name: '',
            isNotSet: isNotSet
        };

        vm.selectRole = selectRole;
        vm.openAddRoleModal = openAddRoleModal;
        vm.openAssignGroupToRole = openAssignGroupToRole;
        vm.openAssignUserToRole = openAssignUserToRole;
        vm.enableEditMode = enableEditMode;
        vm.disableEditMode = disableEditMode;
        vm.updateRole = updateRole;
        vm.removeRole = removeRole;
        vm.refreshRoles = refreshRoles;
        vm.removeGroupFromRole = removeGroupFromRole;
        vm.removeUserFromRole = removeUserFromRole;
        vm.refreshRoleDetails = refreshRoleDetails;

        activate();

        function activate() {
            var promises = [getRoles(), getResourceTags()];
            return $q.all(promises).then(function () {
            });
        }

        function isNotSet() {
            return vm.resourceTag.isNew ? vm.resourceTag.name.length == 0 : vm.resourceTag.id == null;
        }

        function getResourceTags() {
            return rolesService.getResourceTags().then(function (data) {
                vm.resourceTags = data;
                return vm.resourceTags;
            });
        }

        function openModal(name, saveCallback, resolve) {
            resolve = resolve || {};
            var modal = {
                addRole: {
                    templateUrl: '/app/users-roles/roles.add-role-modal.html',
                    controller: 'AddRoleController',
                    controllerAs: 'addRolerVm',
                    size: 'lg',
                    resolve: resolve
                },
                assignGroupToRole: {
                    templateUrl: '/app/users-roles/roles.assign-group-to-role-modal.html',
                    controller: 'AssignGroupToRoleController',
                    controllerAs: 'assignGroupVm',
                    resolve: resolve
                },
                assignUserToRole: {
                    templateUrl: '/app/users-roles/roles.assign-user-to-role-modal.html',
                    controller: 'AssignUserToRoleController',
                    controllerAs: 'assignUserToRoleVm',
                    resolve: resolve
                }
            };

            var modalInstance = $uibModal.open(modal[name]);

            if (angular.isFunction(saveCallback)) {
                modalInstance.result.then(saveCallback);
            }
        }

        function openAddRoleModal() {
            function save(model) {
                if (typeof model.resource_tag_name == "undefined") {
                    var index = helpers.findIndexOfArray(vm.resourceTags, 'id', model.resource_tag_id);
                    if (index != -1) {
                        model.resource_tag_name = vm.resourceTags[index].name;
                    }
                }
                vm.roles.push(model);
            }

            openModal('addRole', save);
        }

        function openAssignGroupToRole() {
            var resolve = {
                selectedRole: function () {
                    return vm.selectedRole;
                },
                roles: function () {
                    return vm.roles;
                }
            };

            openModal('assignGroupToRole', null, resolve);
        }

        function openAssignUserToRole() {
            var resolve = {
                selectedRole: function () {
                    return vm.selectedRole;
                },
                roles: function () {
                    return vm.roles;
                }
            };

            openModal('assignUserToRole', null, resolve);
        }

        function selectRole(id) {
            if (!vm.selectedRole || vm.selectedRole.id != id) {
                var promises = [getRole(id)];
                return $q.all(promises).then(function () {
                    vm.isEditModeEnabled = false;
                });
            }
        }

        function getRoles() {
            return rolesService.getRoles().then(function (data) {
                vm.roles = data;
                delete vm.selectedRole;
                return vm.roles;
            });
        }

        function refreshRoles() {
            getRoles();
            delete vm.selectedRole;
        }

        function getRole(id) {
            return rolesService.getRole(id).then(function (data) {
                vm.selectedRole = data;
                return vm.selectedRole;
            });
        }

        function enableEditMode() {
            vm.editingRole = angular.copy(vm.selectedRole);
            vm.resourceTag.id = vm.editingRole.resource_tag_id;
            vm.isEditModeEnabled = true;
        }

        function disableEditMode() {

            vm.isEditModeEnabled = false;
        }

        function updateRole(roleId) {
            var model = {
                name: vm.editingRole.name,
                "clusters_edit": vm.editingRole.permissions[3].clusters.access_level == 2 ? 1 : 0,
                "clusters_view": vm.editingRole.permissions[3].clusters.access_level > 0 ? 1 : 0,
                "clusters_notify": vm.editingRole.permissions[3].clusters.notify ? 1 : 0,
                "source_edit": vm.editingRole.permissions[0].sources.access_level == 2 ? 1 : 0,
                "source_view": vm.editingRole.permissions[0].sources.access_level > 0 ? 1 : 0,
                "source_notify": vm.editingRole.permissions[0].sources.notify ? 1 : 0,
                "adaptive_edit": vm.editingRole.permissions[2].adaptive_channels.access_level == 2 ? 1 : 0,
                "adaptive_view": vm.editingRole.permissions[2].adaptive_channels.access_level > 0 ? 1 : 0,
                "adaptive_notify": vm.editingRole.permissions[2].adaptive_channels.notify ? 1 : 0,
                "delivery_edit": vm.editingRole.permissions[1].delivery_channels.access_level == 2 ? 1 : 0,
                "delivery_view": vm.editingRole.permissions[1].delivery_channels.access_level > 0 ? 1 : 0,
                "delivery_notify": vm.editingRole.permissions[1].delivery_channels.notify ? 1 : 0
            };
            if (vm.resourceTag.isNew) {
                model.resource_tag_name = vm.resourceTag.name;
            } else {
                model.resource_tag_id = vm.resourceTag.id;
            }

            return rolesService.updateRole(roleId, model).then(function () {
                var index = helpers.findIndexOfArray(vm.roles, 'id', roleId);
                if (index != -1) {

                    var newPermissions = [{
                        "sources": {
                            "access_level": model.source_edit ? 2 : model.source_view,
                            "notify": model.source_notify == 1
                        }
                    }, {
                        "delivery_channels": {
                            "access_level": model.delivery_edit ? 2 : model.delivery_view,
                            "notify": model.delivery_notify == 1
                        }
                    }, {
                        "adaptive_channels": {
                            "access_level": model.adaptive_edit ? 2 : model.adaptive_view,
                            "notify": model.adaptive_notify == 1
                        }
                    }, {
                        "clusters": {
                            "access_level": model.clusters_edit ? 2 : model.clusters_view,
                            "notify": model.clusters_notify == 1
                        }
                    }];
                    var idx;
                    if (vm.resourceTag.isNew) {
                        model.resource_tag_name = vm.resourceTag.name;
                        getResourceTags();
                        idx = helpers.findIndexOfArray(vm.resourceTags, 'name', model.resource_tag_name);
                        if (idx != -1) {
                            model.resource_tag_id = vm.resourceTags[idx].id;
                        }
                    } else {
                        model.resource_tag_id = vm.resourceTag.id;
                        idx = helpers.findIndexOfArray(vm.resourceTags, 'id', model.resource_tag_id);
                        if (idx != -1) {
                            model.resource_tag_name = vm.resourceTags[idx].name;
                        }
                    }
                    model.permissions = newPermissions;

                    vm.selectedRole = _.extend(vm.selectedRole, model);
                    vm.roles[index] = _.extend(vm.roles[index], model);
                    vm.isEditModeEnabled = false;
                    delete vm.editingRole;
                    return vm.selectedRole;
                }
                return false;
            });
        }

        function removeRole(roleId) {
            if (confirm("Do you want delete this role?")) {
                return rolesService.deleteRole(roleId).then(function () {
                    var index = helpers.findIndexOfArray(vm.roles, 'id', roleId);
                    if (index !== -1) {
                        vm.roles.splice(index, 1);
                    }
                    delete vm.selectedRole;
                });
            }
        }

        function removeGroupFromRole(roleId, groupId) {
            if (confirm("Do you want remove group from role?")) {
                return rolesService.removeGroupFromRole(roleId, groupId).then(function () {
                    var index = helpers.findIndexOfArray(vm.selectedRole.groups, 'id', groupId);
                    if (index !== -1) {
                        vm.selectedRole.groups.splice(index, 1);
                    }
                });
            }
        }

        function removeUserFromRole(roleId, userId) {
            if (confirm("Do you want delete this role?")) {
                return rolesService.removeUserFromRole(roleId, userId).then(function () {
                    var index = helpers.findIndexOfArray(vm.selectedRole.users, 'id', userId);
                    if (index !== -1) {
                        vm.selectedRole.users.splice(index, 1);
                    }
                });
            }
        }

        function refreshRoleDetails(roleId) {
            getRole(roleId);
        }

    }
})();
