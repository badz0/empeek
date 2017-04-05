(function () {
    'use strict';

    angular
        .module('app.feeders')
        .controller('FeedersController', FeedersController);

    FeedersController.$inject = ['$q', '$sce', '$uibModal', '$cookies', '_', 'feedersService', 'constants', 'helpers'];

    /* @ngInject */
    function FeedersController($q, $sce, $uibModal, $cookies, _, feedersService, constants, helpers) {
        var vm = this;

        vm.statuses = constants.statuses;
        vm.resourceTags = [];
        vm.remote_access_keys = [];
        vm.selectTime = "from=now-1h&to=now";
        vm.namePattern = '^([a-zA-Z][a-zA-Z0-9_]*)$';

        vm.dns_prefix = $cookies.get("dns_prefix");
        vm.application_host = $cookies.get("application_host");

        vm.feeders = [];
        vm.events = [];
        vm.editingFeeder = {};

        vm.getFeeders = getFeeders;
        vm.openAddFeederModal = openAddFeederModal;
        vm.selectFeeder = selectFeeder;
        vm.setStatusFeeder = setStatusFeeder;
        vm.deleteSelectFeeder = deleteSelectFeeder;
        vm.saveEditingFeeder = saveEditingFeeder;
        vm.updateRecords = updateRecords;
        vm.editFeeder = editFeeder;
        vm.cancelEditing = cancelEditing;
        vm.getSourceURL = getSourceURL;
        vm.getDetails = getDetails;
        vm.getStatus = getStatus;

        activate();

        ////////////////

        function activate() {
            var promises = [getFeeders()];
            return $q.all(promises).then(function () {
            });
        }

        function getResourceTags() {
            return feedersService.getResourceTags().then(function (data) {
                vm.resourceTags = data;
                return vm.resourceTags;
            });
        }

        function getFeeders() {
            return feedersService.getFeeders().then(function (data) {
                vm.feeders = data;
                return vm.feeders;
            });
        }

        function selectFeeder(item) {
            if ((!vm.selectedFeeder) || (vm.selectedFeeder.id !== item.id)) {
                getDetails(item);
            }
        }

        function getDetails(item) {
            var promises = [getFeederDetail(item),getFeeders()];
            return $q.all(promises).then(function () {
                vm.showEditFeeder = false;
                delete vm.editingFeeder;
            });
        }

        function getStatus(item) {
            var status="";
            if(item.is_enabled){
                (item.state === "active")? status=vm.statuses[item.generalStatus]:status='PENDING';
            }
            else{
                status='DISABLED';
            }
            return status;
        }

        function getFeederDetail(feeder) {
            return feedersService.getFeeder(feeder).then(function (data) {
                vm.selectedFeeder = data;
                return vm.selectedFeeder;
            });
        }

        function editFeeder() {
            vm.showEditFeeder = true;
            vm.editingFeeder = angular.copy(vm.selectedFeeder);
            getResourceTags();
            getKeys();
        }

        function getKeys() {
            return feedersService.getKeys().then(function (data) {
                vm.remote_access_keys = data;
                return vm.remote_access_keys;
            });
        }

        function saveEditingFeeder() {
            var model = {
                // name: vm.editingFeeder.name,
                resource_tag_id: vm.editingFeeder.resource_tag_id,
                api_user: vm.editingFeeder.api_user,
                api_password: vm.editingFeeder.api_password,
                remote_access_key_id: vm.editingFeeder.remote_access_key_id
            };
            return feedersService.updateFeeder(vm.selectedFeeder.name, model).then(function (/*data*/) {
                var index = helpers.findIndexOfArray(vm.feeders, 'name', vm.selectedFeeder.name);
                if (index != -1) {
                    vm.selectedFeeder = _.extend(vm.selectedFeeder, model);
                    vm.feeders[index] = _.extend(vm.feeders[index], vm.selectedFeeder);
                    vm.showEditFeeder = false;
                    delete vm.editingFeeder;
                }

                return getDetails(vm.selectedFeeder)
            });
        }

        function deleteSelectFeeder() {
            if (confirm("Do you want delete this feeder?")) {
                return feedersService.deleteFeeder(vm.selectedFeeder.name).then(function (/*data*/) {
                    var index = helpers.findIndexOfArray(vm.feeders, 'port', vm.selectedFeeder.port);
                    if (index != -1) {
                        vm.feeders.splice(index, 1);
                        delete vm.selectedFeeder;
                        return true;
                    }
                });
            }
        }

        function setStatusFeeder() {
            if (vm.selectedFeeder.is_enabled) {
                vm.selectedFeeder.is_enabled = 0;
            }
            else {
                vm.selectedFeeder.is_enabled = 1;
            }
            var model = {
                is_enabled: vm.selectedFeeder.is_enabled
            };
            return feedersService.updateFeeder(vm.selectedFeeder.name, model).then(function (/*data*/) {
                var index = helpers.findIndexOfArray(vm.feeders, 'name', vm.selectedFeeder.name);
                if (index !== -1) {
                    vm.feeders[index] = _.extend(vm.feeders[index], model);
                }
            });
        }


        function updateRecords() {
            getFeeders().then(function () {
                if (vm.selectedFeeder) {
                    getFeederDetail(vm.selectedFeeder);
                }
            })
        }

        function cancelEditing() {
            vm.showEditFeeder = false;
            delete vm.editingFeeder;
        }

        function openAddFeederModal() {
            var resolve = {};

            function save(newFeeder) {
                feedersService.getFeederById(newFeeder.id).then(function (data) {
                    vm.feeders.push(data);
                });
            }

            openModal('addFeeders', save, resolve);
        }

        function getSourceURL() {
            vm.sourceURL = $sce.trustAsResourceUrl(vm.selectedFeeder.history_link + vm.selectTime);
            return vm.sourceURL;
        }

        function openModal(name, saveCallback, resolve) {
            resolve = resolve || {};
            var modal = {
                addFeeders: {
                    templateUrl: '/app/feeders/add-feeders-modal.html',
                    controller: 'FeedersModalAddController',
                    controllerAs: 'addFeederVm',
                    resolve: resolve
                }
            };

            var modalInstance = $uibModal.open(modal[name]);

            if (angular.isFunction(saveCallback)) {
                modalInstance.result.then(saveCallback);
            }
        }
    }
})();


