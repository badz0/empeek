(function () {
    'use strict';

    angular
        .module('app.feeders')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'feeders',
                config: {
                    url: '/feeders',
                    templateUrl: '/app/feeders/feeders.html',
                    controller: 'FeedersController',
                    controllerAs: 'vm',
                    title: 'FEEDERS',
                    settings: {
                        nav: 3,
                        iconClass: 'fa fa-rss',
                        is_child:true,
                        group_name:'RESOURCES',
                        notificationsKey: 'feeders'
                    }
                }
            }
        ];
    }
})();
