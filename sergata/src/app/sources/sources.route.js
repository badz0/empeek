(function () {
    'use strict';

    angular
        .module('app.sources')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'sources',
                config: {
                    url: '/sources',
                    templateUrl: '/app/sources/sources.html',
                    controller: 'SourcesController',
                    controllerAs: 'vm',
                    title: 'SOURCES',
                    settings: {
                        nav: 5,
                        iconClass: 'fa fa-video-camera',
                        notificationsKey: 'sources'
                    }
                }
            }
        ];
    }
})();

