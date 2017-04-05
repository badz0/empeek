(function () {
    'use strict';

    angular
        .module('app.clusters')
        .controller('HistoryBroadcasterController', HistoryBroadcasterController);

    HistoryBroadcasterController.$inject = ['$sce', '$uibModalInstance', 'broadcaster'];

    function HistoryBroadcasterController($sce, $uibModalInstance, broadcaster) {
        var vm = this;
        vm.selectTime = "from=now-1h&to=now";

        vm.closeModal = closeModal;
        vm.getSourceURL = getSourceURL;

        function getSourceURL() {
            vm.sourceURL = $sce.trustAsResourceUrl(broadcaster.history_link + vm.selectTime);
            return vm.sourceURL;
        }

        function closeModal() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
