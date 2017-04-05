(function () {
    'use strict';

    angular
        .module('app.delivery-channels')
        .controller('RtmpPushDeliveryChannelsModalAddController', RtmpPushDeliveryChannelsModalAddController);

    RtmpPushDeliveryChannelsModalAddController.$inject = ['$uibModalInstance', '_', 'editRtmpPush', 'selectedChannel','deliveryChannelsService'];

    /* @ngInject */
    function RtmpPushDeliveryChannelsModalAddController($uibModalInstance, _, editRtmpPush, selectedChannel,deliveryChannelsService) {
        var vm = this;


        vm.closeModal = closeModal;
        vm.saveRtmp = saveRtmp;


        activate();

        function activate() {
            if (!_.isEmpty(editRtmpPush)) {
                vm = _.extend(vm, editRtmpPush);
            }
        }

        function saveRtmp() {
            var model = {
                name: vm.name,
                username: vm.username,
                password: vm.password,
                target: vm.target,
                alt_target: vm.alt_target,
                delivery_channel_id:selectedChannel.id
            };
            if (_.isEmpty(editRtmpPush)) {
                return deliveryChannelsService.addRtmpPush(model).then(function () {
                    $uibModalInstance.close(model);
                })
            }
            else {
               // var newRtmpPush = _.extend(editRtmpPush, model);
                return deliveryChannelsService.updateRtmpPush(editRtmpPush, model).then(function () {
                    $uibModalInstance.close(model);
                })
            }
        }

        function closeModal() {
            $uibModalInstance.dismiss('cancel');
        }
    }

})();


