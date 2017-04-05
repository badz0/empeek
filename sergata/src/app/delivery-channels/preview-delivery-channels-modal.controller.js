(function () {
    'use strict';

    angular
        .module('app.delivery-channels')
        .controller('DeliveryChannelsModalPreviewController', DeliveryChannelsModalPreviewController);

    DeliveryChannelsModalPreviewController.$inject = ['$sce', '$uibModalInstance', 'selectChannel'];

    function DeliveryChannelsModalPreviewController($sce, $uibModalInstance, selectChannel) {
        var vm = this;

        vm.closeModal = closeModal;

        activate();

        function activate() {
            vm.source = selectChannel.publicOutput;
            vm.prevURL = $sce.trustAsResourceUrl(selectChannel.publicOutput);
        }

        function closeModal() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
