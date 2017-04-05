(function () {
    'use strict';

    angular
        .module('app.delivery-channels')
        .controller('DeliveryChannelsController', DeliveryChannelsController);

    DeliveryChannelsController.$inject = ['$scope', '$q', '$uibModal', 'constants', 'helpers', 'deliveryChannelsService', '_'];
    /* @ngInject */
    function DeliveryChannelsController($scope, $q, $uibModal, constants, helpers, deliveryChannelsService, _) {
        var vm = this;

        vm.showEditChannel = false;
        vm.statuses = constants.statuses;

        vm.channels = [];

        vm.setSelectedChannel = setSelectedChannel;
        vm.updateRecords = updateRecords;
        vm.openModalAdd = openModalAdd;
        vm.openModalAddZixiPush = openModalAddZixiPush;
        vm.openModalAddZixiPull = openModalAddZixiPull;
        vm.openModalAddRtmpPush = openModalAddRtmpPush;
        vm.openModalPreview = openModalPreview;
        vm.openModalHistory = openModalHistory;
        vm.editChannel = editChannel;
        vm.deleteChannel = deleteChannel;
        vm.setStatusChannels = setStatusChannels;
        vm.editZixiPush = editZixiPush;
        vm.setStatusZixiPush = setStatusZixiPush;
        vm.deleteZixiPush = deleteZixiPush;
        vm.editZixiPull = editZixiPull;
        vm.setStatusZixiPull = setStatusZixiPull;
        vm.deleteZixiPull = deleteZixiPull;
        vm.editRtmpPush = editRtmpPush;
        vm.setStatusRtmpPush = setStatusRtmpPush;
        vm.deleteRtmpPush = deleteRtmpPush;
        vm.showPass = showPass;
        vm.getChannelDetail = getChannelDetail;
        vm.showActiveView = showActiveView;

        activate();

        $scope.$watchCollection('vm.selectedChannel.zixiPush', notificationZixiPush);
        $scope.$watchCollection('vm.selectedChannel.zixiPull', notificationZixiPull);
        $scope.$watchCollection('vm.selectedChannel.rtmpPush', notificationRtmpPush);

        function activate() {
            var promises = [getChannels()];
            return $q.all(promises).then(function () {
            });
        }

        function getChannels() {
            return deliveryChannelsService.getDeliveryChannels().then(function (data) {
                vm.channels = data;
                return vm.channels;
            });
        }

        function setSelectedChannel(item) {
            if ((!vm.selectedChannel) || (vm.selectedChannel.name !== item.name)) {
                getChannel(item);
            }
        }

        function showActiveView(view) {
            vm.activeView = view;
        }

        function getChannel(channel) {
            var promises = [getChannelDetail(channel)];
            return $q.all(promises).then(function () {
            });
        }

        function notificationZixiPush() {
            vm.zixiPushError = 0;
            if (vm.selectedChannel) {
                var arrZixiPush = vm.selectedChannel.zixiPush;
                for (var index in arrZixiPush) {
                    if (arrZixiPush[index].generalStatus === "bad" && arrZixiPush[index].is_enabled) {
                        vm.zixiPushError++;
                    }
                }
            }
        }

        function notificationZixiPull() {
            vm.zixiPullError = 0;
            if (vm.selectedChannel) {
                var arrZixiPull = vm.selectedChannel.zixiPull;
                for (var index in arrZixiPull) {
                    if (arrZixiPull[index].generalStatus === "bad" && arrZixiPull[index].is_enabled) {
                        vm.zixiPullError++;
                    }
                }
            }
        }

        function notificationRtmpPush() {
            vm.rtmpPushError = 0;
            if (vm.selectedChannel) {
                var arrRtmpPush = vm.selectedChannel.rtmpPush;
                for (var index in arrRtmpPush) {
                    if (arrRtmpPush[index].generalStatus === "bad" && arrRtmpPush[index].is_enabled) {
                        vm.rtmpPushError++;
                    }
                }
            }
        }

        function showPass(item) {
            item.isVisiblePass = true;
        }

        function getChannelDetail(channel) {
            getChannels().then(function () {
                delete vm.selectedChannel;
                var index = helpers.findIndexOfArray(vm.channels, 'name', channel.name);
                if (index !== -1) {
                    vm.selectedChannel = vm.channels[index];
                }
            });
        }

        function updateRecords() {
            delete vm.selectedChannel;
            getChannels();
        }

        function deleteChannel() {
            if (confirm("Are you sure you want delete this channel?")) {
                return deliveryChannelsService.deleteChannel(vm.selectedChannel.name).then(function () {
                    var index = helpers.findIndexOfArray(vm.channels, 'name', vm.selectedChannel.name);
                    if (index !== -1) {
                        vm.channels.splice(index, 1);
                        delete vm.selectedChannel;
                    }
                });
            }
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
            return deliveryChannelsService.updateChannel(vm.selectedChannel, model).then(function () {
                var index = helpers.findIndexOfArray(vm.channels, 'name', vm.selectedChannel.name);
                if (index !== -1) {
                    vm.channels[index] = _.extend(vm.channels[index], model);
                }
            })
        }

        function editChannel() {
            vm.editChanel = angular.copy(vm.selectedChannel);
            var resolve = {
                editChannel: function () {
                    return vm.editChanel;
                }
            };

            function save(value) {
                getChannelDetail(value);
                var index = helpers.findIndexOfArray(vm.channels, 'name', vm.selectedChannel.name);
                if (index !== -1) {
                    vm.selectedChannel = vm.channels[index];
                    delete vm.editChanel;
                }
            }

            openModal('add', save, resolve);
        }

        function openModalAdd() {
            var resolve = {
                editChannel: function () {
                    return {};
                }
            };

            function save(/*value*/) {
                getChannels();
            }

            openModal('add', save, resolve);
        }

        function openModalAddZixiPush() {
            var resolve = {
                editZixiPush: function () {
                    return {};
                },
                selectedChannel: function () {
                    return vm.selectedChannel;
                }
            };

            function save(/*value*/) {
                getChannelDetail(vm.selectedChannel);
            }

            openModal('addZixiPush', save, resolve);
        }

        function openModalAddZixiPull() {
            var resolve = {
                editZixiPull: function () {
                    return {};
                },
                selectedChannel: function () {
                    return vm.selectedChannel;
                }
            };

            function save(/*value*/) {
                getChannelDetail(vm.selectedChannel);
            }

            openModal('addZixiPull', save, resolve);
        }

        function openModalAddRtmpPush() {
            var resolve = {
                editRtmpPush: function () {
                    return {};
                },
                selectedChannel: function () {
                    return vm.selectedChannel;
                }
            };

            function save(/*value*/) {
                getChannelDetail(vm.selectedChannel);
            }

            openModal('addRtmpPush', save, resolve);
        }

        function editZixiPush(item) {
            vm.selectedZixiPush = item;
            vm.editZixiPushItem = angular.copy(vm.selectedZixiPush);
            var resolve = {
                editZixiPush: function () {
                    return vm.editZixiPushItem;
                },
                selectedChannel: function () {
                    return vm.selectedChannel;
                }
            };

            function save(value) {
                var index = helpers.findIndexOfArray(vm.selectedChannel.zixiPush, 'name', vm.selectedZixiPush.name);
                if (index !== -1) {
                    vm.selectedChannel.zixiPush[index] = _.extend(vm.selectedChannel.zixiPush[index], value);
                    delete vm.editZixiPushItem;
                    delete vm.selectedZixiPush;
                }
            }

            openModal('addZixiPush', save, resolve);
        }

        function setStatusZixiPush(item) {
            var arrZixiPush = vm.selectedChannel.zixiPush;
            var index = helpers.findIndexOfArray(arrZixiPush, 'name', item.name);
            (arrZixiPush[index].is_enabled) ? arrZixiPush[index].is_enabled = 0 : arrZixiPush[index].is_enabled = 1;
            var model = {
                is_enabled: arrZixiPush[index].is_enabled
            };
            return deliveryChannelsService.updateZixiPush(item, model).then(function () {
                getChannelDetail(vm.selectedChannel);
                return true;
            })
        }

        function deleteZixiPush(item) {
            if (confirm("Are you sure you want delete this zixiPush?")) {
                return deliveryChannelsService.deleteZixiPush(item.name).then(function () {
                    getChannelDetail(vm.selectedChannel);
                });
            }
        }

        function editZixiPull(item) {
            vm.selectedZixiPull = item;
            vm.editZixiPullItem = angular.copy(vm.selectedZixiPull);

            var resolve = {
                editZixiPull: function () {
                    return vm.editZixiPullItem;
                },
                selectedChannel: function () {
                    return vm.selectedChannel;
                }
            };

            function save(value) {
                var index = helpers.findIndexOfArray(vm.selectedChannel.zixiPull, 'name', vm.selectedZixiPull.name);
                if (index !== -1) {
                    vm.selectedChannel.zixiPull[index] = _.extend(vm.selectedChannel.zixiPull[index], value);
                    delete vm.editZixiPullItem;
                    delete vm.selectedZixiPull;
                }
            }

            openModal('addZixiPull', save, resolve);

        }

        function setStatusZixiPull(item) {
            var arrZixiPull = vm.selectedChannel.zixiPull;
            var index = helpers.findIndexOfArray(arrZixiPull, 'name', item.name);
            (arrZixiPull[index].is_enabled) ? arrZixiPull[index].is_enabled = 0 : arrZixiPull[index].is_enabled = 1;
            var model = {
                is_enabled: arrZixiPull[index].is_enabled
            };
            return deliveryChannelsService.updateZixiPull(item, model).then(function () {
                getChannelDetail(vm.selectedChannel);
                return true;
            })
        }

        function deleteZixiPull(item) {
            if (confirm("Are you sure you want delete this zixiPull?")) {
                return deliveryChannelsService.deleteZixiPull(item.name).then(function (/*data*/) {
                    getChannelDetail(vm.selectedChannel);
                });
            }
        }

        function editRtmpPush(item) {
            vm.selectedRtmpPush = item;
            vm.editRtmpPushItem = angular.copy(vm.selectedRtmpPush);
            var resolve = {
                editRtmpPush: function () {
                    return vm.editRtmpPushItem;
                },
                selectedChannel: function () {
                    return vm.selectedChannel;
                }
            };

            function save(value) {
                var index = helpers.findIndexOfArray(vm.selectedChannel.rtmpPush, 'name', vm.selectedRtmpPush.name);
                if (index !== -1) {
                    vm.selectedChannel.rtmpPush[index] = _.extend(vm.selectedChannel.rtmpPush[index], value);
                    delete vm.editRtmpPushItem;
                    delete vm.selectedRtmpPush;
                }
            }

            openModal('addRtmpPush', save, resolve);
        }

        function setStatusRtmpPush(item) {
            var arrRtmpPush = vm.selectedChannel.rtmpPush;
            var index = helpers.findIndexOfArray(arrRtmpPush, 'name', item.name);
            (arrRtmpPush[index].is_enabled) ? arrRtmpPush[index].is_enabled = 0 : arrRtmpPush[index].is_enabled = 1;
            var model = {
                is_enabled: arrRtmpPush[index].is_enabled
            };
            return deliveryChannelsService.updateRtmpPush(item, model).then(function () {
                getChannelDetail(vm.selectedChannel);
                return true;
            })
        }

        function deleteRtmpPush(item) {
            if (confirm("Are you sure you want delete this RtmpPush?")) {
                return deliveryChannelsService.deleteRtmpPush(item.name).then(function (/*data*/) {
                    getChannelDetail(vm.selectedChannel);
                });
            }
        }

        function openModalPreview() {
            var resolve = {
                selectChannel: function () {
                    return vm.selectedChannel;
                }
            };

            openModal('preview', null, resolve);
        }

        function openModalHistory(item) {
            var resolve = {
                item: function () {
                    return item;
                }
            };

            openModal('history', null, resolve);
        }

        function openModal(view, callbackSuccess, resolve) {
            resolve = resolve || {};

            var modal;
            modal = {
                add: {
                    templateUrl: '/app/delivery-channels/add-delivery-channels-modal.html',
                    controller: 'DeliveryChannelsModalAddController',
                    controllerAs: 'addVm',
                    resolve: resolve
                },
                preview: {
                    templateUrl: '/app/delivery-channels/preview-delivery-channels-modal.html',
                    controller: 'DeliveryChannelsModalPreviewController',
                    controllerAs: 'previewVm',
                    resolve: resolve
                },
                addZixiPull: {
                    templateUrl: '/app/delivery-channels/add-zixi-pull-delivery-channels-modal.html',
                    controller: 'ZixiPullDeliveryChannelsModalAddController',
                    controllerAs: 'addVm',
                    resolve: resolve
                },
                addZixiPush: {
                    templateUrl: '/app/delivery-channels/add-zixi-push-delivery-channels-modal.html',
                    controller: 'ZixiPushDeliveryChannelsModalAddController',
                    controllerAs: 'addVm',
                    resolve: resolve
                },
                addRtmpPush: {
                    templateUrl: '/app/delivery-channels/add-rtmp-push-delivery-channels-modal.html',
                    controller: 'RtmpPushDeliveryChannelsModalAddController',
                    controllerAs: 'addVm',
                    resolve: resolve
                },
                history: {
                    templateUrl: '/app/delivery-channels/history-delivery-channels-modal.html',
                    controller: 'HistoryDeliveryChannelsController',
                    controllerAs: 'historyVm',
                    size: 'lg',
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
