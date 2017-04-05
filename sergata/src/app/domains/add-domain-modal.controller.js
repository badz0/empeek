(function () {
    'use strict';

    angular
        .module('app.domains')
        .controller('AddDomainModalController', AddDomainModalController);

    AddDomainModalController.$inject = ['$uibModalInstance', 'domainsService'];
    /* @ngInject */
    function AddDomainModalController($uibModalInstance, domainsService) {
        var vm = this;

        vm.saveDomain = saveDomain;
        vm.cancel = cancel;

        activate();

        function activate() {
        }

        function saveDomain() {

            var model = {
                "name": vm.name,
                "dns_prefix": vm.dns_prefix,
                "admin_name": vm.admin_name,
                "admin_email": vm.admin_email,
                "admin_password": vm.admin_password
            };
            return domainsService.createDomain(model).then(function () {
                $uibModalInstance.close(model);
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancelled');
        }
    }
})();

