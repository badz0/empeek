(function () {
    'use strict';

    angular
        .module('app.settings')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$q','$rootScope','$uibModal', 'helpers', 'settingsService', '$cookies'];
    /* @ngInject */
    function SettingsController($q, $rootScope, $uibModal, helpers, settingsService, $cookies) {

        var vm = this;
        
        $rootScope.activeTabIndex = 0;
        
        vm.customer_dns_prefix = $cookies.get("dns_prefix");

        vm.deleteAccessKey = deleteAccessKey;
        vm.refreshSAccessKeys = refreshSAccessKeys;
        vm.openAddSourceModal = openAddSourceModal;
        vm.enableEditMode = enableEditMode;
        vm.disableEditMode = disableEditMode;
        vm.enableEditModeAws = enableEditModeAws;
        vm.disableEditModeAws = disableEditModeAws;
        vm.updateAccount = updateAccount;
        vm.updateAccountAws = updateAccountAws;


        activate();

        function activate() {
            var promises = [getAccessKeys(), getAccount()];
            return $q.all(promises).then(function (data) {
                getAWSAccount(data[1].customer_id);
            });
        }

        function getAWSAccount(id) {
            return settingsService.getAwsAccount(id).then(function (data) {
                vm.awsAccount = data;
                return vm.awsAccount;
            });
        }

        function getAccessKeys() {
            return settingsService.getAccessKeys().then(function (data) {
                vm.accessKeys = data;
                return vm.accessKeys;
            });
        }

        function refreshSAccessKeys() {
            getAccessKeys();
        }

        function deleteAccessKey(name) {
            if (confirm("Do you want delete this access key?")) {
                return settingsService.deleteAccessKey(name).then(function () {
                    var index = helpers.findIndexOfArray(vm.accessKeys, 'name', name);
                    if (index !== -1) {
                        vm.accessKeys.splice(index, 1);
                    }
                });
            }
        }

        function openModal(view, callbackSuccess) {
            var modal = {
                add: {
                    templateUrl: '/app/settings/add-access-key-modal.html',
                    controller: 'AddAccessKeyModalController',
                    controllerAs: 'addKeyVm'
                }
            };
            var modalInstance = $uibModal.open(modal[view]);
            if (callbackSuccess) {
                modalInstance.result.then(callbackSuccess);
            }
        }

        function openAddSourceModal() {
            openModal('add', refreshSAccessKeys)
        }

        function getAccount() {
            return settingsService.getDetails().then(function (data) {
                vm.account = data;
                return vm.account;
            });
        }


        function enableEditMode() {
            vm.editingAccount = angular.copy(vm.account);
            vm.editingAccount.password = '';
            vm.editingAccount.confirmedPassword = '';
            vm.isEditModeEnabled = true;
        }

        function disableEditMode() {
            vm.isEditModeEnabled = false;
        }

        function enableEditModeAws() {
            vm.editingAccountAws = angular.copy(vm.awsAccount);
            vm.isEditModeAwsEnabled = true;
        }

        function disableEditModeAws() {
            vm.isEditModeAwsEnabled = false;
        }

        function updateAccount(id) {

            var model = {
                name: vm.editingAccount.name,
                email: vm.editingAccount.email
            };
            if (vm.editingAccount.password || (vm.editingAccount.password.length !== 0)) {
                model.password = vm.editingAccount.password;
            }
            return settingsService.updateAccount(model).then(function () {
                vm.account = _.extend(vm.account, model);
                vm.isEditModeEnabled = false;
                delete vm.editingAccount;
                delete vm.account.password;
                delete vm.account.confirmedPassword;
                return vm.account;
            });

        }

        function updateAccountAws() {
            var model = {
                aws_access_key_id: vm.editingAccountAws.aws_access_key_id,
                aws_secret_key: vm.editingAccountAws.aws_secret_key
            };
            return settingsService.updateAccountAws(vm.awsAccount.name,model).then(function () {
                vm.awsAccount = _.extend(vm.awsAccount, model);
                vm.isEditModeAwsEnabled = false;
                delete vm.editingAccountAws;
                return vm.awsAccount;
            });

        }

        
    }
})();
