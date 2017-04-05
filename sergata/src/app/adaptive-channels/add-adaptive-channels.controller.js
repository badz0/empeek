(function () {
    'use strict';

    angular
        .module('app.adaptive-channels')
        .controller('AdaptiveChannelsModalAddController', AdaptiveChannelsModalAddController);

    AdaptiveChannelsModalAddController.$inject = ['$q', '$uibModalInstance', '_', 'adaptiveChannelService', 'helpers', 'adaptiveChannelsConstants', 'editChannel'];

    function AdaptiveChannelsModalAddController($q, $uibModalInstance, _, adaptiveChannelService, helpers, constants, editChannel) {
        var vm = this;

        vm.currentStep = 0;
        vm.channelsProperty = constants.ChannelProperty;
        vm.editChannel = angular.copy(editChannel);
        vm.changingBitrates = [];
        vm.public_clusters = [];
        vm.bititemSource = {};
        vm.clusters = [];
        vm.numberPattern = "^\\d*$";
        vm.emptyBitrates = false;

        vm.closeModal = closeModal;
        vm.addProperty = addProperty;
        vm.addModeProperty = addModeProperty;
        vm.deleteProperty = deleteProperty;
        vm.saveNewChannel = saveNewChannel;
        vm.saveChannel = saveChannel;
        vm.setCurrentStep = setCurrentStep;
        vm.isIncludeSource = isIncludeSource;
        vm.deleteAllProperty = deleteAllProperty;

        activate();

        function activate() {
            if (_.isEmpty(editChannel)) {
                vm.is_transcoding = null;
            }
            var promises = [getResourceTags(), getClusters(), getSources(), getProfiles(), getPublicClusters()];
            return $q.all(promises).then(function () {
                init();
            });

        }

        function getProfiles() {
            return adaptiveChannelService.getProfiles().then(function (data) {
                vm.profiles = data;
                return vm.profiles;
            });
        }

        function getSources() {
            return adaptiveChannelService.getSources().then(function (data) {
                vm.sources = data;
                return vm.sources;
            });
        }

        function getResourceTags() {
            return adaptiveChannelService.getResourceTags().then(function (data) {
                vm.resourceTags = data;
                return vm.resourceTags;
            });
        }

        function getClusters() {
            return adaptiveChannelService.getClusters().then(function (data) {
                vm.clusters = data;
                return vm.clusters;
            });
        }

        function getPublicClusters() {
            return adaptiveChannelService.getPublicClusters().then(function (data) {
                vm.public_clusters = data;
                return vm.public_clusters;
            });
        }

        function init() {
            if (_.isEmpty(editChannel)) {
                vm.itemsSources = {};
                vm.itemsBitrates = {};
                vm.resource_tag_id = null;
                vm.broadcaster_cluster_id = null;
                vm.itemsSources.source_id = vm.sources[0].id;
                vm.itemsBitrates.profile_id = vm.profiles[0].id;
                vm.is_source_included = false;
                vm.is_HLS = true;
                vm.is_MPEG_DASH = false;
                vm.is_MP4 = false;
                vm.is_TS = true;
                vm.showAdd = false;
            }
            else {
                vm.showAdd = true;
                vm = _.extend(vm, editChannel);
                vm.is_transcoding = !!vm.is_transcoding;
                vm.is_HLS = !!vm.is_HLS;
                vm.is_MPEG_DASH = !!vm.is_MPEG_DASH;
                vm.is_MP4 = !!vm.is_MP4;
                vm.is_TS = !!vm.is_TS;
                vm.is_source_included = !!vm.is_source_included;
                if (vm.is_transcoding && vm.is_source_included) {
                    vm.bititemSource = _.findWhere(vm.bitrates, {profile_id: null});
                    vm.source_id = vm.bititemSource.source_id;
                    var index = helpers.findIndexOfArray(vm.bitrates, 'id', vm.bititemSource.id);
                    if (index !== -1) {
                        vm.bitrates.splice(index, 1);
                    }
                }
            }
        }
        
        function saveChannel() {
            var modelBitrates = angular.copy(vm.bitrates);
            (!vm.is_transcoding) ? modelBitrates.push(vm.itemsSources) : modelBitrates.push(vm.itemsBitrates);
            modelBitrates = _.filter(modelBitrates, function (item) {
                return !_.isUndefined(item);
            });
            var model = {
                name: vm.name,
                resource_tag_id: vm.resource_tag_id,
                broadcaster_cluster_id: vm.broadcaster_cluster_id,
                output_broadcaster_cluster_id: vm.output_broadcaster_cluster_id,
                is_transcoding: vm.is_transcoding,
                is_source_included: (vm.is_transcoding) ? vm.is_source_included : false,
                is_HLS: vm.is_HLS,
                is_MPEG_DASH: vm.is_MPEG_DASH,
                is_MP4: vm.is_MP4,
                is_TS: vm.is_TS,
                bitrates: modelBitrates
            };
            isEmptyBitrates(modelBitrates);
            if (!vm.emptyBitrates || (vm.bitrates.length > 0)) {
                isIncludeSource(modelBitrates);
                if (vm.is_source_included && vm.is_transcoding) {
                    vm.bititemSource.source_id = vm.source_id;
                    vm.bititemSource.profile_id = null;
                    modelBitrates.push(vm.bititemSource);
                }
                (_.isEmpty(editChannel)) ? saveNewChannel(model) : updateChannel(editChannel.name, model);
            }
        }

        function saveNewChannel(model) {
            return adaptiveChannelService.saveNewChannel(model).then(function (data) {
                model.id = data;
                $uibModalInstance.close(model);
            });
        }

        function updateChannel(name, model) {
            return adaptiveChannelService.updateChannel(name, model).then(function (data) {
                $uibModalInstance.close(data);
            })
        }

        function isIncludeSource(bitrates) {
            if (vm.is_transcoding) {
                angular.forEach(bitrates, function (item) {
                    if (vm.is_source_included) {
                        item.source_id = vm.source_id;
                    }
                    else {
                        item.source_id = null;
                    }
                });
            }
            else {
                angular.forEach(bitrates, function (item) {
                    if (item.profile_id) {
                        item.profile_id = null;
                    }
                });
            }

        }

        function setCurrentStep() {
            (vm.currentStep === 0) ? vm.currentStep++ : vm.currentStep--;
            return true;
        }

        function closeModal() {
            $uibModalInstance.dismiss('cancel');
        }

        function isEmptyBitrates(bitrates) {
            if ((_.isUndefined(bitrates[0])) || (bitrates.length === 0)) {
                vm.emptyBitrates = true;
            }
            else {
                vm.emptyBitrates = false;
            }
        }

        function deleteAllProperty() {
            if (vm.is_transcoding) {
                delete vm.itemsBitrates;
                vm.showAdd = true;
            }
            else {
                delete vm.itemsSources;
                vm.showAdd = true;
            }
        }

        function deleteProperty(item) {
            if (item.id) {
                return adaptiveChannelService.deleteBitrate(item.id).then(function () {
                    var index = helpers.findIndexOfArray(vm.bitrates, 'id', item.id);
                    if (index !== -1) {
                        vm.bitrates.splice(index, 1);
                    }
                });
            } else {
                var index = _.findIndex(vm.bitrates, item);
                if (index !== -1) {
                    vm.bitrates.splice(index, 1);
                }
            }
        }

        function addModeProperty() {
            if (_.isEmpty(editChannel)) {
                vm.bitrates = [];
                initProperty();
            }

            return true;
        }

        function initProperty() {
            vm.emptyBitrates = false;
            vm.itemsSources = {};
            vm.itemsBitrates = {};
            if (vm.is_transcoding) {
                vm.itemsBitrates.profile_id = vm.profiles[0].id;
            } else {
                vm.itemsSources.source_id = vm.sources[0].id;
            }
        }

        function addProperty() {
            if (!vm.showAdd) {
                (vm.is_transcoding) ? vm.bitrates.push(vm.itemsBitrates) : vm.bitrates.push(vm.itemsSources);
                initProperty();
            }
            else {
                vm.showAdd = false;
                initProperty();
            }
        }
    }

})();
