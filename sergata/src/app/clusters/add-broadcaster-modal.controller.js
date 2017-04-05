(function () {
    'use strict';

    angular
        .module('app.clusters')
        .controller('AddBroadcasterController', AddBroadcasterController);

    AddBroadcasterController.$inject = ['$uibModalInstance', '$translate', '$q', 'clustersService', 'cluster'];

    function AddBroadcasterController($uibModalInstance, $translate , $q, clustersService, cluster) {
        var vm = this;

        vm.cluster = cluster;
        vm.is_auto_detect = false;
        vm.ph_Name=$translate('NAME');
        //vm.namePattern = '([a-z])*([a-z0-9_]*[a-z0-9])';
        vm.namePattern = '^([a-zA-Z][a-zA-Z0-9_]*)$';
        vm.ipv4Pattern = '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$';

        vm.clearStreamingIP = clearStreamingIP;
        vm.saveBroadcaster = saveBroadcaster;
        vm.closeModal = closeModal;

        activate();

        function activate() {
            var promises = [getKeys()];
            return $q.all(promises).then(function () {
            });
        }

        function clearStreamingIP() {
            vm.streaming_ip = '';
        }

        function getKeys() {
            return clustersService.getKeys().then(function (data) {
                vm.remote_access_key_id = null;
                vm.remoteAccessKeys = data;
                return vm.remoteAccessKeys;
            });
        }

        function saveBroadcaster() {

            var model = {
                "dns_prefix": vm.cluster.dns_prefix,
                "name": vm.name,
                "streaming_ip": vm.streaming_ip,
                "is_auto_detect": vm.is_auto_detect,
                "api_user": vm.api_user,
                "api_password": vm.api_password,
                "remote_access_key_id": vm.remote_access_key_id,
                "instance_id": vm.instance_id,
                "broadcaster_cluster_id": vm.cluster.id
            };

            return clustersService.addBroadcaster(model).then(function (data) {
                $uibModalInstance.close(data.result);
            });

        }

        function closeModal() {
            $uibModalInstance.dismiss('cancel');
        }


    }

})();

