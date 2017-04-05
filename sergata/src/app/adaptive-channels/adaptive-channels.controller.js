(function () {
    'use strict';

    angular
        .module('app.adaptive-channels')
        .controller('AdaptiveChannelsController', AdaptiveChannelsController);

    AdaptiveChannelsController.$inject = ['$scope', '$q', '$uibModal', 'constants', 'helpers', 'adaptiveChannelService', '_'];
    /* @ngInject */
    function AdaptiveChannelsController($scope, $q, $uibModal, constants, helpers, adaptiveChannelService, _) {
        var vm = this;
        vm.adaptivesThumbsView = false;
        vm.showEditChannel = false;
        vm.targetsError = 0;

        vm.channelsProperty = [];
        vm.channelsTableItems = [];
        vm.editChanel = {};
        vm.statuses = constants.statuses;

        vm.setSelectedChannel = setSelectedChannel;
        vm.setSelectedTarget = setSelectedTarget;
        vm.setStatusChannels = setStatusChannels;
        vm.deleteSelectChannel = deleteSelectChannel;
        vm.updateRecords = updateRecords;
        vm.updateRecordsTarget = updateRecordsTarget;
        vm.openModal = openModal;
        vm.deleteSelectTarget = deleteSelectTarget;
        vm.notification = notification;
        vm.openModalPreview = openModalPreview;
        vm.openModalAdd = openModalAdd;
        vm.openModalAssign = openModalAssign;
        vm.openModalHistory = openModalHistory;
        vm.editChannel = editChannel;
        vm.cancelShowEditChannel = cancelShowEditChannel;
        vm.showActiveView = showActiveView;

        activate();

        $scope.$watchCollection('vm.assignTargets', notification);

        function activate() {
            var promises = [getAllChannels()];
            return $q.all(promises).then(function () {
            });
        }

        function getChannelTargets(channel) {
            vm.assignTargets = channel.publishingTarget;
            vm.targetsError = 0;
        }

        function editChannel() {
            vm.editChanel = angular.copy(vm.selectedChannel);
            function save(/*value*/) {
                adaptiveChannelService.getDetailsNewChannel(vm.selectedChannel.id).then(function (data) {
                    var index = helpers.findIndexOfArray(vm.channelsTableItems, 'name', vm.selectedChannel.name);
                    if (index !== -1) {
                        vm.channelsTableItems[index] = _.extendOwn(vm.channelsTableItems[index], data);
                        vm.selectedChannel = _.extend(vm.selectedChannel, data);
                        delete vm.editChanel;
                    }
                });
            }

            var resolve = {
                editChannel: function () {
                    return vm.editChanel;
                }
            };
            openModal('add', save, resolve);
        }

        function showActiveView(view) {
            vm.activeView = view;
        }

        function cancelShowEditChannel() {
            vm.showEditChannel = false;
        }

        function setSelectedChannel(item) {
            if ((!vm.selectedChannel) || (vm.selectedChannel.name !== item.name)) {
                getChannel(item);
            }
        }

        function updateRecordsTarget() {
            getChannel(vm.selectedChannel);
        }

        function getChannel(channel) {
            var promises = [getDetailsChannel(channel), getAllChannels()];
            return $q.all(promises).then(function () {
            });
        }

        function getDetailsChannel(channel) {
            return adaptiveChannelService.getDetails(channel).then(function (data) {
                getChannelTargets(data);
                vm.selectedChannel = data;
                return vm.selectedChannel;
            });
        }

        function setSelectedTarget(item) {
            vm.selectTarget = item;
        }

        function deleteSelectChannel() {
            if (confirm("Are you sure you want delete this channel?")) {
                return adaptiveChannelService.deleteChannel(vm.selectedChannel.name).then(function () {
                    var index = helpers.findIndexOfArray(vm.channelsTableItems, 'name', vm.selectedChannel.name);
                    if (index !== -1) {
                        vm.channelsTableItems.splice(index, 1);
                        delete vm.selectedChannel;
                    }
                });
            }
        }

        function notification() {
            vm.targetsError = 0;
            for (var index in vm.assignTargets) {
                if ((vm.assignTargets[index].generalStatus === "bad") && vm.assignTargets[index].is_enabled) {
                    vm.targetsError++;
                }
            }
        }

        function deleteSelectTarget(item) {
            if (confirm("Are you sure you want delete this target?")) {
                var model = {
                    adaptive_channel_id: null
                };
                return adaptiveChannelService.assignPublishingTarget(item, model).then(function () {
                    var index = helpers.findIndexOfArray(vm.assignTargets, 'name', item.name);
                    if (index !== -1) {
                        vm.assignTargets.splice(index, 1);
                    }
                });
            }
        }

        function updateRecords() {
            getAllChannels().then(function () {
                if (vm.selectedChannel) {
                    getDetailsChannel(vm.selectedChannel);
                }
            })
        }

        function setStatusChannels() {
            if (vm.selectedChannel.is_enabled) {
                vm.selectedChannel.is_enabled = 0;
            }
            else {
                vm.selectedChannel.is_enabled = 1;
            }
            var model = {
                is_enabled: vm.selectedChannel.is_enabled
            };
            return adaptiveChannelService.updateChannel(vm.selectedChannel.name, model).then(function () {
                if (vm.selectedChannel) {
                    getChannel(vm.selectedChannel);
                }
            })
        }


        function getAllChannels() {
            return adaptiveChannelService.getAllChannels().then(function (data) {
                vm.channelsTableItems = data;
                return vm.channelsTableItems;
            });
        }

        function openModalPreview(inChannel) {
            var resolve = {
                selectChannel: vm.selectedChannel,
                selectTarget: function () {
                    return (!inChannel) ? vm.selectTarget : {};
                }
            };

            openModal('preview', null, resolve);
        }

        function openModalAdd() {
            var resolve = {
                editChannel: function () {
                    return {};
                }
            };

            function save(value) {
                adaptiveChannelService.getDetailsNewChannel(value.id).then(function (data) {
                    vm.channelsTableItems.push(data);
                });
            }

            openModal('add', save, resolve);
        }

        function openModalAssign() {
            var resolve = {
                selectChannel: function () {
                    return vm.selectedChannel;
                }
            };

            function save(value) {
                vm.assignTargets.push(value);
            }

            openModal('assign', save, resolve);
        }

        function openModalHistory() {
            var resolve = {
                selectChannel: function () {
                    return vm.selectedChannel;
                },
                selectTarget: function () {
                    return vm.selectTarget;
                }
            };

            openModal('history', null, resolve);
        }

        function openModal(view, callbackSuccess, resolve) {
            resolve = resolve || {};

            var modal = {
                add: {
                    templateUrl: '/app/adaptive-channels/add-adaptive-channels-modal.html',
                    controller: 'AdaptiveChannelsModalAddController',
                    controllerAs: 'addVm',
                    resolve: resolve
                },
                preview: {
                    templateUrl: '/app/adaptive-channels/preview-adaptive-channels-modal.html',
                    controller: 'AdaptiveChannelsModalPreviewController',
                    controllerAs: 'previewVm',
                    resolve: resolve
                },
                history: {
                    templateUrl: '/app/adaptive-channels/history-adaptive-channels-modal.html',
                    controller: 'AdaptiveChannelsModalHistoryController',
                    controllerAs: 'historyVm',
                    size: 'lg',
                    resolve: resolve
                },
                assign: {
                    templateUrl: '/app/adaptive-channels/assign-adaptive-channels-modal.html',
                    controller: 'AdaptiveChannelsModalAssignController',
                    controllerAs: 'assignVm',
                    resolve: resolve
                }
            };
            var modalInstance = $uibModal.open(modal[view]);

            if (angular.isFunction(callbackSuccess)) {
                modalInstance.result.then(callbackSuccess);
            }
        }
    }
})();
