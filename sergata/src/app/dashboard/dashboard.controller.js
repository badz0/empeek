(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dashboardService', '$state'];
    /* @ngInject */
    function DashboardController($q, dashboardService, $state) {
        var vm = this;
        vm.statusArray = [
            "good", "disabled", "warning", "bad"
        ];
       
        vm.goPage = goPage;

        activate();

        function goPage(issue) {
            var namePages = angular.lowercase(issue.type) || '';
            switch (namePages) {
                case('feeder'):
                    $state.go('feeders');
                    break;
                case('source'):
                    $state.go('sources');
                    break;
                case('broadcaster'):
                    $state.go('clusters');
                    break;
                case('adaptive'):
                    $state.go('adaptive-channels');
                    break;
                case('pablishing'):
                    $state.go('publishing-targets');
                    break;
                case('delivery'):
                    $state.go('delivery-channels');
                    break;
            }

        }

        function activate() {
            var promises = [getStatuses(), getIssues()];
            return $q.all(promises).then(function () {
            });
        }

        function getStatuses() {
            return dashboardService.getStatuses().then(function (data) {
                vm.statuses = data;
                return vm.statuses;
            });
        }

        function getIssues() {
            return dashboardService.getIssues().then(function (data) {
                vm.issues = data;
                return vm.issues;
            });
        }
    }
})();
