(function () {
    'use strict';

    angular
        .module('app.users-roles')
        .controller('AddGroupController', AddGroupController);

    AddGroupController.$inject = ['$uibModalInstance', 'groupsService'];
    /* @ngInject */
    function AddGroupController($uibModalInstance, groupsService) {
        var vm = this;

        vm.saveGroup = saveGroup;
        vm.cancel = cancel;

        activate();

        function activate() {
        }

        function saveGroup() {
            var model = {
                "name": vm.group_name
            };
            return groupsService.createGroup(model).then(function (data) {
                var newGroup = {
                    id: data,
                    name: model.name
                }
                $uibModalInstance.close(newGroup);
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancelled');
        }
    }
})();
