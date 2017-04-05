(function () {
    'use strict';

    angular
        .module('app.sources')
        .controller('AddSourceModalController', AddSourceModalController);

    AddSourceModalController.$inject = ['$uibModalInstance', 'sourcesService', 'logger', 'helpers', 'feeders', 'resourceTags', 'inputClusters'];
    /* @ngInject */
    function AddSourceModalController($uibModalInstance, sourcesService, logger, helpers, feeders,  resourceTags, inputClusters) {
        var vm = this;
        vm.resourceTags = resourceTags;
        vm.inputClusters = inputClusters;
        vm.feeders = feeders;
        vm.feederInputs = [];

        vm.saveSource = saveSource;
        vm.cancel = cancel;
        vm.getFeederInputs = getFeederInputs;

        activate();

        function activate() {
        }

        function getFeederInputs(feeder_id) {
            var feeder_idx = helpers.findIndexOfArray(vm.feeders, 'id', feeder_id);
            if (feeder_idx != -1) {
                vm.check_feeder_name = vm.feeders[feeder_idx].name;
            }
            if (feeder_idx != 0){
                return sourcesService.getFeederInputs(vm.check_feeder_name).then(function (data) {
                    vm.feederInputs = data;
                    return vm.feederInputs;
                });
            }

        }

        function saveSource() {

            var model = {
                "name": vm.name,
                "broadcaster_cluster_id": vm.broadcaster_cluster_id,
                "feeder_id": vm.feeder_id,
                "feeder_input": vm.feeder_input,
                "resource_tag_id": vm.resource_tag_id,
                "password": vm.password
            };
            return sourcesService.createSource(model).then(function (data) {
                model.id = data;
                $uibModalInstance.close(model);
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancelled');
        }
    }
})();

