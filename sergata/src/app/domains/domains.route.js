(function () {
    'use strict';

    angular
        .module('app.domains')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'domains',
                config: {
                    url: '/domains',
                    templateUrl: '/app/domains/domains.html',
                    controller: 'DomainsController',
                    controllerAs: 'vm',
                    title: 'DOMAINS',
                    settings: {
                        nav: 12,
                        iconClass: 'fa fa-database'
                    }
                }
            }
        ];
    }
})();

