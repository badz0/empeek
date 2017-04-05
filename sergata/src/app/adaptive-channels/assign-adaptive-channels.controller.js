(function () {
    'use strict';

    angular
        .module('app.adaptive-channels')
        .controller('AdaptiveChannelsModalAssignController', AdaptiveChannelsModalAssignController);

    AdaptiveChannelsModalAssignController.$inject = ['$q', '$uibModalInstance', 'selectChannel', 'adaptiveChannelService', '_'];

    function AdaptiveChannelsModalAssignController($q, $uibModalInstance, selectChannel, adaptiveChannelService, _) {
        var vm = this;

        vm.publicTargets = [];
        vm.selectChannel = selectChannel;
        vm.newTarget = {};

        vm.closeModal = closeModal;
        vm.assignNewTarget = assignNewTarget;

        activate();

        function activate() {
            var promises = [getPublicTargets()];
            return $q.all(promises).then(function () {
            });
        }

        function getPublicTargets() {
            return adaptiveChannelService.getPublicTargets().then(function (data) {
                vm.publicTargets = _.filter(data, function (object) {
                    return (selectChannel.id !== object.adaptive_channel_id);
                });
                return vm.publicTargets;
            });
        }


        function assignNewTarget() {
            var model={
                adaptive_channel_id:selectChannel.id
            };
            return adaptiveChannelService.assignPublishingTarget(vm.newTarget, model).then(function () {
                $uibModalInstance.close(vm.newTarget);
            });

        }

        function closeModal() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
