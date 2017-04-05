(function () {
    'use strict';

    angular
        .module('app.settings')
        .controller('DomainsController', DomainsController);

    DomainsController.$inject = ['$q', '$uibModal', 'domainsService', '$rootScope', '$location', '$window'];
    /* @ngInject */
    function DomainsController($q, $uibModal, domainsService, $rootScope, $location, $window) {

        var vm = this;
        vm.refreshDomains = refreshDomains;
        vm.openAddDomainModal = openAddDomainModal;
        vm.manageDomain = manageDomain;

        activate();

        function activate() {
            var promises = [getDomains()];
            return $q.all(promises).then(function () {
            });
        }

        function getDomains() {
            return domainsService.getDomains().then(function (data) {
                vm.domains = data;
                return vm.domains;
            });
        }

        function refreshDomains() {
            getDomains();
        }

        function openModal(view, callbackSuccess) {
            var modal = {
                add: {
                    templateUrl: '/app/domains/add-domain-modal.html',
                    controller: 'AddDomainModalController',
                    controllerAs: 'addDomainVm'
                }
            };
            var modalInstance = $uibModal.open(modal[view]);
            if (callbackSuccess) {
                modalInstance.result.then(callbackSuccess);
            }
        }

        function openAddDomainModal() {
            function saveNewDomain(data) {
                vm.domains.push(data);
            }

            openModal('add', saveNewDomain)
        }

        function manageDomain(name) {
            return domainsService.manageDomain(name).then(function () {
                $window.location.reload();
                //$rootScope.$on('$stateChangeStart', $rootScope.getNotifications);
            });
        }
    }
})();
