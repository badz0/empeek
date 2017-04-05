(function () {
    'use strict';

    angular
        .module('app.publishing-targets')
        .controller('PublishingTargetsModalAddController', PublishingTargetsModalAddController);

    PublishingTargetsModalAddController.$inject = ['$uibModalInstance', 'publishingTargetsService'];

    function PublishingTargetsModalAddController($uibModalInstance, publishingTargetsService) {
        var vm = this;

        vm.delete_outdated = 1;
        vm.newTarget = {};
        vm.resourceTags = [];
        vm.closeModal = closeModal;
        vm.saveNewTarget = saveNewTarget;

        activate();

        function activate() {
            return publishingTargetsService.getResourceTags().then(function (data) {
                vm.resourceTags = data;
                vm.resource_tag_id = null;
                return vm.resourceTags;
            });
        }

        function saveNewTarget() {
            var model = {
                name: vm.name,
                resource_tag_id: vm.resource_tag_id,
                type: vm.type,
                delete_outdated: vm.delete_outdated,
                ingest_url: vm.ingest_url,
                playback_url: vm.playback_url,
                aws_access_key_id: vm.aws_access_key_id,
                aws_secret_key: vm.aws_secret_key
            };
            return publishingTargetsService.saveNewTarget(model).then(function (data) {
                model.id = data;
                $uibModalInstance.close(model);
            });

        }

        function closeModal() {
            $uibModalInstance.dismiss('cancel');
        }
    }


})();
