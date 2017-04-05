(function () {
    'use strict';

    angular
        .module('app.delivery-channels')
        .controller('DeliveryChannelsModalAddController', DeliveryChannelsModalAddController);

    DeliveryChannelsModalAddController.$inject = ['$uibModalInstance', '_', 'deliveryChannelsService', 'editChannel'];

    function DeliveryChannelsModalAddController($uibModalInstance, _, deliveryChannelsService,  editChannel) {
        var vm = this;

        vm.channelProperty = [];

        vm.closeModal = closeModal;
        vm.saveChannel = saveChannel;

        activate();

        function activate() {
           getChannelProperty();

            if (_.isEmpty(editChannel)) {
                vm.resource_tag_id = null;
                vm.broadcaster_cluster_id = null;
                vm.primary_source = null;
                vm.is_public_output = false;
            }
            else {
                vm = _.extend(vm, editChannel);
                vm.is_public_output=!!vm.is_public_output;
            }
        }

        function getChannelProperty() {
            return deliveryChannelsService.getPropertyChannel().then(function (data) {
                vm.channelProperty = data;
                return vm.channelProperty;
            });
        }

        function saveChannel() {
            if (_.isEmpty(editChannel)) {
                saveNewChannel();
            }
            else {
                saveChangesChannel()
            }
        }

        function saveNewChannel() {
            var model = {
                name: vm.name,
                resource_tag_id: vm.resource_tag_id,
                broadcaster_cluster_id: vm.broadcaster_cluster_id,
                source_id: vm.source_id,
                alt_source_id: (vm.alt_source_id) ? vm.alt_source_id : null,
                is_public_output:vm.is_public_output
            };
            if (vm.is_public_output) {
                model.public_output_password = vm.public_output_password;
            }
            return deliveryChannelsService.saveNewChannel(model).then(function () {
                $uibModalInstance.close(model);
            })
        }

        function saveChangesChannel() {
            var model = {
                name: vm.name,
                resource_tag_id: vm.resource_tag_id,
                broadcaster_cluster_id: vm.broadcaster_cluster_id,
                source_id: vm.source_id,
                alt_source_id: (vm.alt_source_id) ? vm.alt_source_id : null,
                is_public_output:vm.is_public_output
            };
            if (vm.is_public_output) {
                model.public_output_password = vm.public_output_password;
            }
            return deliveryChannelsService.updateChannel(editChannel, model).then(function (data) {
                $uibModalInstance.close(data);
            })
        }

        function closeModal() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
