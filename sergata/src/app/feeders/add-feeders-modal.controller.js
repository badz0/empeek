(function () {
    'use strict';

    angular
        .module('app.feeders')
        .controller('FeedersModalAddController', FeedersModalAddController);

    FeedersModalAddController.$inject = ['$q','$uibModalInstance', 'feedersService'];

    /* @ngInject */
    function FeedersModalAddController($q, $uibModalInstance, feedersService) {
        var vm = this;

        vm.resourceTags = [];
        vm.remote_keys=[];

        //vm.namePattern = '^[A-za-z][a-z0-9]*([a-z0-9_]+)';
        vm.namePattern = '^([a-zA-Z][a-zA-Z0-9_]*)$';

        vm.saveFeeder = saveFeeder;
        vm.closeModal = closeModal;

        activate();

        ////////////////

        function activate() {
            var promises = [getKeys(),getResourceTags()];
            return $q.all(promises).then(function () {
            });
        }

        function getResourceTags() {
            return feedersService.getResourceTags().then(function (data) {
                vm.resourceTags = data;
                vm.resource_tag_id = null;
                return vm.resourceTags;
            });
        }

        function getKeys() {
            return feedersService.getKeys().then(function (data) {
                vm.remote_access_key_id = null;
                vm.remote_keys = data;
                return vm.remote_keys;
            });
        }

        function saveFeeder() {
            var model = {
                name: vm.name,
                resource_tag_id: vm.resource_tag_id,
                api_user: vm.api_user,
                api_password: vm.api_password,
                remote_access_key_id: vm.remote_access_key_id
            };

            return feedersService.addFeeder(model).then(function (data) {
                model.id = data;
                //toastr.error(data.error, 'Error', {"positionClass": "toast-top-center"});
                $uibModalInstance.close(model);
            });

        }

        function closeModal() {
            $uibModalInstance.dismiss('cancel');
        }
    }

})();


