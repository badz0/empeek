(function () {
    'use strict';

    angular
        .module('app.users-roles')
        .controller('AddRoleController', AddRoleController);

    AddRoleController.$inject = ['$uibModalInstance', 'rolesService', 'helpers'];
    /* @ngInject */
    function AddRoleController($uibModalInstance, rolesService, helpers) {
        var vm = this;

        vm.permissions = [];
        vm.resourceTags = [];

        vm.resourceTag = {
            isNew: false,
            id: null,
            name: ''
        };

        vm.saveRole = saveRole;
        vm.cancel = cancel;

        activate();

        function activate() {
            getResourceTags().then(function() {
                if (vm.resourceTags.length == 0)
                    vm.resourceTag.isNew = true;
            });
        }

        function getResourceTags() {
            return rolesService.getResourceTags().then(function (data) {
                vm.resourceTags = data;
                return vm.resourceTags;
            });
        }

        function saveRole() {
            var model = {
                "name": vm.role_name,

                "clusters_edit": vm.permissions[0].clusters.access_level == 2 ? 1 : 0,
                "clusters_view": vm.permissions[0].clusters.access_level > 0 ? 1 : 0,
                "clusters_notify": vm.permissions[0].clusters.notify ? 1 : 0,
                "source_edit": vm.permissions[1].sources.access_level == 2 ? 1 : 0,
                "source_view": vm.permissions[1].sources.access_level > 0 ? 1 : 0,
                "source_notify": vm.permissions[1].sources.notify ? 1 : 0,
                "adaptive_edit": vm.permissions[2].adaptive_channels.access_level == 2 ? 1 : 0,
                "adaptive_view": vm.permissions[2].adaptive_channels.access_level > 0 ? 1 : 0,
                "adaptive_notify": vm.permissions[2].adaptive_channels.notify ? 1 : 0,
                "delivery_edit": vm.permissions[3].delivery_channels.access_level == 2 ? 1 : 0,
                "delivery_view": vm.permissions[3].delivery_channels.access_level > 0 ? 1 : 0,
                "delivery_notify": vm.permissions[3].delivery_channels.notify ? 1 : 0
            };
            if (vm.resourceTag.isNew) {
                model.resource_tag_name = vm.resourceTag.name;
            } else {
                model.resource_tag_id = vm.resourceTag.id;
            }

            return rolesService.createRole(model).then(function (id) {
                var newPermissions = [
                    {
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
                var index;
                if (vm.resourceTag.isNew) {
                    model.resource_tag_name = vm.resourceTag.name;
                    getResourceTags();
                    index = helpers.findIndexOfArray(vm.resourceTags, 'name', model.resource_tag_name);
                    if (index != -1) {
                        model.resource_tag_id = vm.resourceTags[index].id;
                    }
                } else {
                    model.resource_tag_id = vm.resourceTag.id;
                    index = helpers.findIndexOfArray(vm.resourceTags, 'id', model.resource_tag_id);
                    if (index != -1) {
                        model.resource_tag_name = vm.resourceTags[index].name;
                    }
                }
                model.permissions = newPermissions;
                model.id = id;
                $uibModalInstance.close(model);
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancelled');
        }
    }
})();
