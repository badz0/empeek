(function () {
    'use strict';

    angular
        .module('app.delivery-channels')
        .controller('ZixiPushDeliveryChannelsModalAddController', ZixiPushDeliveryChannelsModalAddController);

    ZixiPushDeliveryChannelsModalAddController.$inject = ['$uibModalInstance', '_', 'editZixiPush', 'selectedChannel', 'deliveryChannelsService'];

    /* @ngInject */
    function ZixiPushDeliveryChannelsModalAddController($uibModalInstance, _, editZixiPush, selectedChannel, deliveryChannelsService) {
        var vm = this;


        vm.closeModal = closeModal;
        vm.saveZixi = saveZixi;

        activate();

        ////////////////

        function activate() {
            if (_.isEmpty(editZixiPush)) {
                vm.is_bonding=true;
                vm.password = "";
                vm.latecny = 6000;
            }
            else {
                vm = _.extend(vm, editZixiPush);
                vm.is_bonding=!!vm.is_bonding;
            }
        }

        function saveZixi() {
            var model = {
                name: vm.name,
                is_bonding: vm.is_bonding,
                target: vm.target,
                password: vm.password,
                latecny: vm.latecny,
                delivery_channel_id:selectedChannel.id
            };

            if (_.isEmpty(editZixiPush)) {
                return deliveryChannelsService.addZixiPush(model).then(function () {
                    $uibModalInstance.close(model);
                })
            }
            else {
              //  var newZixiPush = _.extend(editZixiPush, model);
                return deliveryChannelsService.updateZixiPush(editZixiPush,model).then(function () {
                    $uibModalInstance.close(model);
                })
            }
        }


        function closeModal() {
            $uibModalInstance.dismiss('cancel');
        }
    }

})();
