(function () {
    'use strict';

    angular
        .module('app.delivery-channels')
        .controller('HistoryDeliveryChannelsController', HistoryDeliveryChannelsController);

    HistoryDeliveryChannelsController.$inject = ['$sce', '$uibModalInstance', 'item'];

    function HistoryDeliveryChannelsController($sce, $uibModalInstance, item) {
        var vm = this;
        vm.selectTime = "from=now-1h&to=now";

        vm.closeModal = closeModal;
        vm.getSourceURL = getSourceURL;

        function getSourceURL() {
            vm.sourceURL = $sce.trustAsResourceUrl(item.history_link + vm.selectTime);
            return vm.sourceURL;
        }

        function closeModal() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
