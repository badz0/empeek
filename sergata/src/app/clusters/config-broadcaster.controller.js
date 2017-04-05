(function () {
    'use strict';

    angular
        .module('app.clusters')
        .controller('ConfigBroadcasterController', ConfigBroadcasterController);

    ConfigBroadcasterController.$inject = ['$sce', '$uibModalInstance', '$cookies', 'broadcaster'];

    function ConfigBroadcasterController($sce, $uibModalInstance, $cookies, broadcaster) {
        var vm = this;
        vm.broadcaster = broadcaster;
        vm.dns_prefix = $cookies.get("dns_prefix");
        vm.application_host = $cookies.get("application_host");

        console.log('ConfigBroadcasterController', broadcaster)

        vm.closeModal = closeModal;

        function closeModal() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
