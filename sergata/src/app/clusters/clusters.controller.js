(function () {
    'use strict';

    angular
        .module('app.clusters')
        .controller('ClustersController', ClustersController);

    ClustersController.$inject = ['$scope', '$q', '$cookies', '$uibModal', '_', 'clustersService', 'constants', 'clustersConstants', 'helpers'];
    /* @ngInject */
    function ClustersController($scope, $q, $cookies, $uibModal, _, clustersService, constants, clustersConstants, helpers) {
        var vm = this;
        vm.statuses = constants.statuses;
        vm.resourceTags = clustersConstants.resourceTags;

        vm.clusters = [];
        vm.editingCluster = {};
        vm.badBroadcasters = 0;
        vm.namePattern = '[a-z0-9]*([a-z0-9]+)';

        vm.getCluster = getCluster;
        vm.updateRecords = updateRecords;
        vm.getBroadcasters = getBroadcasters;
        vm.selectCluster = selectCluster;
        vm.editCluster = editCluster;
        vm.deleteCluster = deleteCluster;
        vm.saveEditingCluster = saveEditingCluster;
        vm.cancelEditing = cancelEditing;
        vm.openAddClusterModal = openAddClusterModal;
        vm.openAddBroadcasterModal = openAddBroadcasterModal;
        vm.deleteBroadcaster = deleteBroadcaster;
        vm.disableBroadcaster = disableBroadcaster;
        vm.enableBroadcaster = enableBroadcaster;
        vm.openBroadcasterHistoryModal = openBroadcasterHistoryModal;
        vm.openBroadcasterConfigHelpModal = openBroadcasterConfigHelpModal;
        vm.customer_dns_prefix = $cookies.get("dns_prefix");
        vm.application_host = $cookies.get("application_host");


        activate();

        $scope.$watchCollection('vm.selectedBroadcasters', countErrors);

        function activate() {

            var promises = [getClusters(), getResourceTags()];
            return $q.all(promises).then(function () {
            });
        }

        function countErrors() {
            vm.badBroadcasters = 0;
            for (var index in vm.selectedBroadcasters) {
                if (vm.selectedBroadcasters[index].generalStatus === "bad") {
                    vm.badBroadcasters++;
                }
            }
        }

        function openModal(name, saveCallback, resolve) {
            resolve = resolve || {};
            var modal = {
                addCluster: {
                    templateUrl: '/app/clusters/add-cluster-modal.html',
                    controller: 'AddClusterController',
                    controllerAs: 'addClusterVm',
                    resolve: resolve
                },
                addBroadcaster: {
                    templateUrl: '/app/clusters/add-broadcaster-modal.html',
                    controller: 'AddBroadcasterController',
                    controllerAs: 'addBroadcasterVm',
                    resolve: resolve
                },
                history: {
                    templateUrl: '/app/clusters/history-broadcaster-modal.html',
                    controller: 'HistoryBroadcasterController',
                    controllerAs: 'historyVm',
                    size: 'lg',
                    resolve: resolve
                },
                config_help: {
                    templateUrl: '/app/clusters/config-broadcaster-modal.html',
                    controller: 'ConfigBroadcasterController',
                    controllerAs: 'configVm',
                    size: 'lg',
                    resolve: resolve
                }
            };

            var modalInstance = $uibModal.open(modal[name]);

            if (angular.isFunction(saveCallback)) {
                modalInstance.result.then(saveCallback);
            }
        }

        function updateRecords() {
            getClusters().then(function () {
                if (vm.selectedCluster) {
                    getCluster(vm.selectedCluster.dns_prefix);
                }
            })
        }

        function openAddClusterModal() {

            function save(newCluster) {
                clustersService.getDetailNewCluster(newCluster.id).then(function (data) {
                    vm.clusters.push(data);
                });

            }

            var resolve = {
                resourceTags: function () {
                    return vm.resourceTags;
                },
                customerDnsPrefix: function () {
                    return vm.customer_dns_prefix;
                },
                applicationHost: function () {
                    return vm.application_host;
                }
        };

            openModal('addCluster', save, resolve);
        }

        function editCluster(cluster) {
            vm.editingCluster = angular.copy(cluster);
            vm.showEditing = true;
        }

        function cancelEditing() {
            vm.showEditing = false;
            delete vm.editingCluster;
        }

        function selectCluster(dnsPrefix) {
            if (!vm.selectedCluster || vm.selectedCluster.dns_prefix != dnsPrefix) {
                var promises = [getCluster(dnsPrefix), getBroadcasters(dnsPrefix),getClusters()];
                return $q.all(promises).then(function () {
                    vm.showEditing = false;
                    delete vm.editingCluster;
                });
            }
        }

        function deleteCluster(dnsPrefix) {
            if (confirm("Do you want delete this cluster?")) {
                return clustersService.deleteCluster(dnsPrefix).then(function () {
                    var index = helpers.findIndexOfArray(vm.clusters, 'dns_prefix', dnsPrefix);

                    if (index != -1) {
                        vm.clusters.splice(index, 1);
                        delete vm.selectedCluster;
                        return true;
                    }
                });
            }
        }

        function saveEditingCluster(dnsPrefix) {
            var model = {
                name: vm.editingCluster.name,
                dns_prefix: vm.editingCluster.dns_prefix,
                resource_tag_id: vm.editingCluster.resource_tag_id
            };

            return clustersService.updateCluster(dnsPrefix, model).then(function () {
                var index = helpers.findIndexOfArray(vm.clusters, 'dns_prefix', dnsPrefix);

                if (index != -1) {
                    vm.selectedCluster = _.extend(vm.selectedCluster, model);
                    vm.clusters[index] = _.extend(vm.clusters[index], model);
                    vm.showEditing = false;
                    delete vm.editingCluster;
                    return vm.selectedCluster;
                }
                return false;
            });
        }

        function getCluster(dnsPrefix) {
            return clustersService.getCluster(dnsPrefix).then(function (data) {
                vm.selectedCluster = data;
                return vm.selectedCluster;
            });
        }

        function getClusters() {
            return clustersService.getClusters().then(function (data) {
                vm.clusters = data;
                return vm.clusters;
            });
        }

        function openAddBroadcasterModal() {
            var resolve = {
                cluster: function () {
                    return vm.selectedCluster;
                }
            };

            function save(id) {
                clustersService.getBroadcasters(vm.selectedCluster.dns_prefix).then(success);
                function success(data) {
                    var model = _.find(data, function(x) {return x.id == id;})
                    vm.selectedBroadcasters.push(model);

                    var index = helpers.findIndexOfArray(vm.clusters, 'dns_prefix', vm.selectedCluster.dns_prefix);
                    if (index != -1) {
                        vm.clusters[index].disabled_outputs++;
                    }
                    vm.selectedCluster.disabled_outputs++;
                }
            }

            openModal('addBroadcaster', save, resolve);
        }

        function deleteBroadcaster(broadcasterName, dnsPrefix, broadcasterPort) {
            if (confirm("Do you want delete this broadcaster?")) {
                return clustersService.deleteBroadcaster(broadcasterName).then(function () {
                    var index = helpers.findIndexOfArray(vm.selectedBroadcasters, 'port', broadcasterPort);

                    if (index != -1) {
                        vm.selectedBroadcasters.splice(index, 1);
                    }

                    index = helpers.findIndexOfArray(vm.clusters, 'dns_prefix', dnsPrefix);
                    if (index != -1) {
                        clustersService.getCluster(dnsPrefix).then(function(data) {
                            vm.clusters[index] = data;
                        });
                    }

                });
            }
        }

        function enableBroadcaster(broadcaster) {
            var model = {
                is_enabled: 1
            };
            return clustersService.updateBroadcaster(broadcaster.name, model).then(function () {
                var index = helpers.findIndexOfArray(vm.selectedBroadcasters, 'port', broadcaster.port);
                if (index != -1) {
                    vm.selectedBroadcasters[index].is_enabled = 1;
                }
                return false;
            });

        }

        function disableBroadcaster(broadcaster) {
            var model = {
                is_enabled: 0
            };
            return clustersService.updateBroadcaster(broadcaster.name, model).then(function () {
                var index = helpers.findIndexOfArray(vm.selectedBroadcasters, 'port', broadcaster.port);
                if (index != -1) {
                    vm.selectedBroadcasters[index].is_enabled = 0;
                }
                return false;
            });

        }

        function getBroadcasters(dnsPrefix) {
            return clustersService.getBroadcasters(dnsPrefix).then(function (data) {
                vm.selectedBroadcasters = data;
                return vm.selectedBroadcasters;
            });
        }

        function openBroadcasterConfigHelpModal(broadcaster) {
            var resolve = {
                broadcaster: broadcaster
            };

            function save(newBroadcaster) {
                vm.selectedBroadcasters.push(newBroadcaster);
            }

            openModal('config_help', save, resolve);
        }

        function openBroadcasterHistoryModal(broadcaster) {
            var resolve = {
                broadcaster: broadcaster
            };

            function save(newBroadcaster) {
                vm.selectedBroadcasters.push(newBroadcaster);
            }

            openModal('history', save, resolve);
        }

        function getResourceTags() {
            return clustersService.getResourceTags().then(function (data) {
                vm.resourceTags = data;
                return vm.resourceTags;
            });
        }
    }
})();

