(function () {
    'use strict';

    angular
        .module('app.users-roles')
        .controller('AddUserController', AddUserController);

    AddUserController.$inject = ['$uibModalInstance', 'usersService'];

    /* @ngInject */
    function AddUserController($uibModalInstance, usersService) {
        var vm = this;

        vm.closeModal=closeModal;
        vm.registrNewUser=registrNewUser;

        activate();

        ////////////////

        function activate() {

        }

        function registrNewUser() {
            var model = {
                "name": vm.name,
                "password": vm.password,
                "email":vm.email
            };
            return usersService.saveNewUser(model).then(function (data) {
                model.user_id = data.user_id;
                $uibModalInstance.close(model);
            });
        }

        function closeModal() {
            $uibModalInstance.dismiss('cancel');
        }

    }

})();

