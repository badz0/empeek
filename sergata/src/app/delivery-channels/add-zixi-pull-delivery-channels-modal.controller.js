(function () {
    'use strict';

    angular
        .module('app.delivery-channels')
        .controller('ZixiPullDeliveryChannelsModalAddController', ZixiPullDeliveryChannelsModalAddController);

    ZixiPullDeliveryChannelsModalAddController.$inject = ['$uibModalInstance', '_', 'editZixiPull', 'selectedChannel', 'deliveryChannelsService','$translate'];

    /* @ngInject */
    function ZixiPullDeliveryChannelsModalAddController($uibModalInstance, _, editZixiPull, selectedChannel, deliveryChannelsService,$translate) {
        var vm = this;

        vm.closeModal = closeModal;
        vm.saveZixi = saveZixi;


        activate();

        ////////////////

        function activate() {
            if (_.isEmpty(editZixiPull)) {
                vm.reciever = "";
                vm.latecny = 0;
                vm.reciever_stream = selectedChannel.name;
            }
            else {
                vm = _.extend(vm, editZixiPull);
            }
            $translate('REMOTE_CONFIGURATION')
                .then(function (translatedValue) {
                    vm.translateLatency = translatedValue;
                });
        }

        function saveZixi() {
            var model = {
                name: vm.name,
                delivery_channel_id:selectedChannel.id,
                reciever: vm.reciever,
                password: vm.password,
                reciever_stream:vm.reciever_stream,
                latecny: (vm.latecny !== vm.translateLatency) ? parseInt(vm.latecny, 10) : 0
            };
            if (_.isEmpty(editZixiPull)) {
                return deliveryChannelsService.addZixiPull(model).then(function () {
                    $uibModalInstance.close(model);
                })
            }
            else {
                return deliveryChannelsService.updateZixiPull(editZixiPull,model).then(function () {
                    $uibModalInstance.close(model);
                })
            }
        }

        function closeModal() {
            $uibModalInstance.dismiss('cancel');
        }
    }

})();
