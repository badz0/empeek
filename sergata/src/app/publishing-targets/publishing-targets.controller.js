(function () {
    'use strict';

    angular
        .module('app.publishing-targets')
        .controller('PublishingTargetsController', PublishingTargetsController);

    PublishingTargetsController.$inject = ['$q', '$uibModal', 'helpers', 'publishingTargetsService', '_'];

    function PublishingTargetsController($q, $uibModal, helpers, publishingTargetsService, _) {
        var vm = this;

        vm.allTargets = [];
        vm.editTarget = {};
        vm.resourceTags = [];

        vm.setSelectedTarget = setSelectedTarget;
        vm.deleteSelectTarget = deleteSelectTarget;
        vm.updateTargets = updateTargets;
        vm.openAddTargetModal = openAddTargetModal;
        vm.getDetailsTarget = getDetailsTarget;
        vm.editPublishingTarget = editPublishingTarget;
        vm.saveChangeTarget = saveChangeTarget;
        vm.cancelShowEditTarget = cancelShowEditTarget;

        activate();

        function activate() {
            var promises = [getAllTargets()];
            return $q.all(promises).then(function () {
            });
        }

        function setSelectedTarget(item) {
            if ((!vm.selectTarget) || (vm.selectTarget.id !== item.id)) {
                getDetails(item);
            }
        }

        function getResourceTags() {
            return publishingTargetsService.getResourceTags().then(function (data) {
                vm.resourceTags = data;
                return vm.resourceTags;
            });
        }

        function editPublishingTarget() {
            vm.showEditTarget = true;
            vm.editTarget = angular.copy(vm.selectTarget);
            getResourceTags();
        }

        function cancelShowEditTarget() {
            vm.showEditTarget = false;
        }

        function updateTargets() {
            getAllTargets().then(function () {
                if (vm.selectTarget) {
                    getDetailsTarget(vm.selectTarget);
                }
            })
        }

        function getDetailsTarget(target) {
            return publishingTargetsService.getDetailsTargets(target).then(function (data) {
                vm.showEditTarget = false;
                delete vm.editTarget;
                vm.selectTarget = data;
                vm.selectTarget.is_https = !!vm.selectTarget.is_https;
                return vm.selectTarget;
            });
        }

        function getDetails(target) {
            var promises = [getAllTargets(), getDetailsTarget(target)];
            return $q.all(promises).then(function () {
            });
        }

        function getAllTargets() {
            return publishingTargetsService.getAllTargets().then(function (data) {
                vm.allTargets = data;
                return vm.allTargets;
            });
        }

        function saveChangeTarget() {
            var model = {
                name: vm.editTarget.name,
                resource_tag_id: vm.editTarget.resource_tag_id,
                ingest_url: vm.editTarget.ingest_url,
                delete_outdated: vm.editTarget.delete_outdated
            };
            if (vm.editTarget.type == 's3') {
                model.aws_access_key_id = vm.editTarget.aws_access_key_id;
                model.aws_secret_key = vm.editTarget.aws_secret_key && vm.editTarget.aws_secret_key.length ? vm.editTarget.aws_secret_key : undefined;
            } else {
                model.playback_url = vm.editTarget.playback_url;
            }
            return publishingTargetsService.updatePublishingTarget(vm.selectTarget.name, model).then(function () {
                var indexTag = helpers.findIndexOfArray(vm.resourceTags, 'id', model.resource_tag_id);
                if (indexTag !== -1) {
                    model.resource_tag_name = vm.resourceTags[indexTag].name;
                }
                var index = helpers.findIndexOfArray(vm.allTargets, 'name', vm.selectTarget.name);
                if (index !== -1) {
                    vm.allTargets[index] = _.extend(vm.allTargets[index], model);
                    vm.selectTarget = _.extend(vm.selectTarget, model);
                    vm.selectTarget.aws_secret_key = undefined;
                    vm.showEditTarget = false;
                    //delete vm.editTarget;
                }
            })
        }

        function deleteSelectTarget() {
            if (confirm("Are you sure you want delete this channel?")) {
                return publishingTargetsService.deleteSelectTarget(vm.selectTarget.name).then(function () {
                    var index = helpers.findIndexOfArray(vm.allTargets, 'name', vm.selectTarget.name);
                    if (index !== -1) {
                        vm.allTargets.splice(index, 1);
                        delete vm.selectTarget;
                    }
                });
            }
        }


        function openAddTargetModal() {
            var modalInstance = $uibModal.open({
                templateUrl: '/app/publishing-targets/add-publishing-target-modal.html',
                controller: 'PublishingTargetsModalAddController',
                controllerAs: 'addVm',
                resolve: {}

            });

            function callbackSuccess(newTarget) {
                vm.allTargets.push(newTarget);
            }

            modalInstance.result.then(callbackSuccess);
        }
    }
})();
