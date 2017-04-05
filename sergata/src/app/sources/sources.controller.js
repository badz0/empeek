(function () {
    'use strict';

    angular
        .module('app.sources')
        .controller('SourcesController', SourcesController);

    SourcesController.$inject = ['$q', '$uibModal', '$sce', 'sourcesService', 'sourcesConstant', 'constants', 'helpers', '$cookies'];
    /* @ngInject */
    function SourcesController($q, $uibModal, $sce, sourcesService, sourcesConstant, constants, helpers, $cookies) {
        var vm = this;
        vm.isEditModeEnabled = false;
        vm.onlineStatuses = sourcesConstant.onlineStatuses;
        vm.enableStatuses = sourcesConstant.enableStatuses;
        vm.statuses = constants.statuses;
        vm.customer_dns_prefix = $cookies.get("dns_prefix");
        vm.application_host = $cookies.get("application_host");

        vm.openAddSourceModal = openAddSourceModal;
        vm.selectSource = selectSource;
        vm.showPassword = showPassword;
        vm.createHistoryUrl = createHistoryUrl;
        vm.toggleSourceEnableStatus = toggleSourceEnableStatus;
        vm.updateSource = updateSource;
        vm.removeSource = removeSource;
        vm.enableEditMode = enableEditMode;
        vm.disableEditMode = disableEditMode;
        vm.refreshSources = refreshSources;
        vm.showActiveView = showActiveView;
        vm.getFeederInputs = getFeederInputs;

        activate();

        function activate() {
            var promises = [getSources(), getFeeders(), getClusters(), getResourceTags()];
            return $q.all(promises).then(function () {
            });
        }

        function getSources() {
            return sourcesService.getSources().then(function (data) {
                vm.sources = data;
                return vm.sources;
            });
        }

        function refreshSources() {
            vm.visiblePassIndex = null;
            getSources().then(function () {
                if (vm.selectedSource) {
                    selectSource(vm.selectedSource.name);
                }
            })
        }

        function showActiveView(view) {
            vm.activeView = view;
        }

        function showPassword(index) {
            vm.visiblePassIndex = index;
            return false;
        }

        function selectSource(name) {
            if (!vm.selectedSource || vm.selectedSource.name != name) {
                return sourcesService.getSource(name).then(function (data) {
                    vm.selectedSource = data;
                    var idx = helpers.findIndexOfArray(vm.inputClusters, 'id', vm.selectedSource.feeder_input);
                    if (idx != -1) {
                        vm.selectedSource.feeder_input_name = vm.inputClusters[idx].name;
                    }

                    if(!vm.selectedSource.feeder.name || vm.selectedSource.feeder.name === undefined){
                        vm.selectedSource.feeder.name = 'Unmanaged';
                    }
                    vm.isEditModeEnabled = false;
                    getSources();
                    delete vm.editingSource;
                    return vm.selectedSource;
                });
            }
            else {
                vm.selectedSource.isVisiblePass = false;
            }
        }

        function openModal(view, callbackSuccess, resolve) {
            resolve = resolve || {};
            var modal = {
                add: {
                    templateUrl: '/app/sources/add-source-modal.html',
                    controller: 'AddSourceModalController',
                    controllerAs: 'addSourceVm',
                    resolve: resolve
                }
            };
            var modalInstance = $uibModal.open(modal[view]);
            if (callbackSuccess) {
                modalInstance.result.then(callbackSuccess);
            }
        }

        function openAddSourceModal() {
            function saveNewSource(newSource) {
                sourcesService.getDetailNewSource(newSource.id).then(function (data) {
                    vm.sources.push(data);
                });
            }

            var resolve = {
                feeders: function () {
                    return vm.feeders;
                },
                resourceTags: function () {
                    return vm.resourceTags;
                },
                inputClusters: function () {
                    return vm.inputClusters;
                },
                feederInputs: function () {
                    return vm.feederInputs;
                }
            };
            openModal('add', saveNewSource, resolve);
        }

        function createHistoryUrl(source, selectedPeriod) {
            if (source) {
                source.sourceURL = $sce.trustAsResourceUrl(source.history_link + selectedPeriod);
                return source.sourceURL;
            }
        }

        function toggleSourceEnableStatus(name) {
            if (vm.selectedSource.is_enabled) {
                vm.selectedSource.is_enabled = 0;
            }
            else {
                vm.selectedSource.is_enabled = 1;
            }
            var model = {
                name: name,
                is_enabled: vm.selectedSource.is_enabled
            };

            return sourcesService.updateData(name, model).then(function () {
                var index = helpers.findIndexOfArray(vm.sources, 'name', name);
                if (index !== -1) {
                    vm.sources[index] = _.extend(vm.sources[index], model);
                }
            })

        }

        function enableEditMode() {
            vm.isEditModeEnabled = true;
            var promises = [getResourceTags(), getClusters(), getFeeders(), getFeederInputs(vm.selectedSource.feeder.id)];
            return $q.all(promises).then(function () {
                vm.editingSource = angular.copy(vm.selectedSource);
                vm.editingSource.resourceTag = {};
                vm.editingSource.resourceTag.id = vm.editingSource.resource_tag_id;
            });
        }

        function disableEditMode() {
            vm.isEditModeEnabled = false;
        }

        function updateSource(oldName) {
            var model = {
                "name": vm.editingSource.name,
                "resource_tag_id": vm.editingSource.resourceTag.id,
                "feeder_id": vm.editingSource.feeder_id,
                "password": vm.editingSource.password
            };
            if(model.feeder_id !== null){
                model.feeder_input = vm.editingSource.feeder_input;
            }


            return sourcesService.updateData(oldName, model).then(function () {
                var index = helpers.findIndexOfArray(vm.sources, 'name', oldName);
                if (index != -1) {
                    var res_tag_idx = helpers.findIndexOfArray(vm.resourceTags, 'id', model.resource_tag_id);
                    if (res_tag_idx != -1) {
                        model.resource_tag_name = vm.resourceTags[res_tag_idx].name;
                    }

                    var feeder_idx = helpers.findIndexOfArray(vm.feeders, 'id', vm.editingSource.feeder_id);
                    if (feeder_idx != -1) {
                        vm.selectedSource.feeder.name = vm.feeders[feeder_idx].name;
                    }

                    var feeder_input_idx = helpers.findIndexOfArray(vm.feederInputs, 'id', vm.editingSource.feeder_input);
                    if (feeder_input_idx != -1) {
                        vm.selectedSource.feeder_input_name = vm.feederInputs[feeder_input_idx].name;
                    }

                    vm.selectedSource = _.extend(vm.selectedSource, model);
                    vm.sources[index] = _.extend(vm.sources[index], model);
                    vm.isEditModeEnabled = false;
                    delete vm.editingSource;
                    return vm.selectedSource;
                }
                return false;
            });
        }

        function removeSource(name) {
            if (confirm("Do you want delete this source?")) {
                return sourcesService.deleteSource(name).then(function () {
                    var index = helpers.findIndexOfArray(vm.sources, 'name', name);
                    if (index !== -1) {
                        vm.sources.splice(index, 1);
                    }
                    delete vm.selectedSource;
                });
            }
        }

        function getResourceTags() {
            return sourcesService.getResourceTags().then(function (data) {
                vm.resourceTags = data;
                return vm.resourceTags;
            });
        }

        function getClusters() {
            return sourcesService.getClusters().then(function (data) {
                vm.inputClusters = data;
                return vm.inputClusters;
            });
        }

        function getFeeders() {
            return sourcesService.getFeeders().then(function (data) {
                vm.feeders = data;
                vm.feeders.unshift({
                    name: "Unmanaged",
                    id: null
                });
                return vm.feeders;
            });
        }

        function getFeederInputs(feeder_id) {
            var feeder_idx = helpers.findIndexOfArray(vm.feeders, 'id', feeder_id);
            if ((feeder_idx != -1) && (feeder_idx != 0)) {
                var feeder_name = vm.feeders[feeder_idx].name;
                return sourcesService.getFeederInputs(feeder_name).then(function (data) {
                    vm.feederInputs = data;
                    return vm.feederInputs;
                });
            }


        }
    }
})();
