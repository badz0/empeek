(function () {
    'use strict';

    angular
        .module('app.adaptive-channels')
        .controller('AdaptiveChannelsModalHistoryController', AdaptiveChannelsModalHistoryController);

    AdaptiveChannelsModalHistoryController.$inject = ['$sce', '$uibModalInstance', 'selectTarget'];

    function AdaptiveChannelsModalHistoryController($sce, $uibModalInstance, selectTarget) {
        var vm = this;
        vm.selectTime = "from=now-1h&to=now";

        vm.closeModal = closeModal;
        vm.getSourceURL = getSourceURL;

        function getSourceURL() {
            vm.sourceURL = $sce.trustAsResourceUrl(selectTarget.history_link + vm.selectTime);
            return vm.sourceURL;
        }

        function closeModal() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
