(function () {
    'use strict';

    angular
        .module('app.sources')
        .controller('AddAccessKeyModalController', AddAccessKeyModalController);

    AddAccessKeyModalController.$inject = ['$uibModalInstance', 'settingsService'];
    /* @ngInject */
    function AddAccessKeyModalController($uibModalInstance, settingsService) {
        var vm = this;

        vm.saveKey = saveKey;
        vm.cancel = cancel;

        activate();

        function activate() {
        }

        function saveKey() {

            var model = {
                "name": vm.name
            };
            return settingsService.createAccessKey(model).then(function () {
                $uibModalInstance.close(model);
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancelled');
        }
    }
})();
