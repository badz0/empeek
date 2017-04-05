(function() {
    'use strict';

    angular
        .module('app.publishing-targets')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'publishing-targets',
                config: {
                    url: '/publishing-targets',
                    templateUrl: '/app/publishing-targets/publishing-targets.html',
                    controller: 'PublishingTargetsController',
                    controllerAs: 'vm',
                    title: 'PUBLISHING_TARGETS',
                    settings: {
                        nav: 7,
                        iconClass: 'fa fa-share-square',
                        is_child:true
                        // notificationsKey: 'publishing_targets'
                    }
                }
            }
        ];
    }
})();
