(function () {
    'use strict';

    angular
        .module('app.adaptive-channels')
        .controller('AdaptiveChannelsModalPreviewController', AdaptiveChannelsModalPreviewController);

    AdaptiveChannelsModalPreviewController.$inject = ['$sce', '$uibModalInstance', 'selectChannel', 'selectTarget', '_', 'JWPlayerService'];

    function AdaptiveChannelsModalPreviewController($sce, $uibModalInstance, selectChannel, selectTarget, _, JWPlayerService) {
        var vm = this;

        vm.closeModal = closeModal;
       
        activate();
        
        function activate() {
            if (!_.isEmpty(selectTarget)) {
                if (selectTarget.type == 's3') {
                    vm.source=selectTarget.ingest_url + selectChannel.name + '_live.m3u8';
                }
                else {
                    vm.source=selectTarget.playback_url;
                }
            }
            else {
                vm.source = selectChannel.public_output_url || selectChannel.preview_url;
            }

            setTimeout(function() {
                JWPlayerService.renderPreviewJWP('jws_player_box' , vm.source);
            }, 250);
        }

        function closeModal() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
