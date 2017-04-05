(function () {
    'use strict';

    angular
        .module('app.adaptive-channels')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'adaptive-channels',
                config: {
                    url: '/adaptive-channels',
                    templateUrl: '/app/adaptive-channels/adaptive-channels.html',
                    controller: 'AdaptiveChannelsController',
                    controllerAs: 'vm',
                    title: 'ADAPTIVE_CHANNELS',
                    settings: {
                        nav: 6,
                        iconClass: 'fa fa-cogs',
                        notificationsKey: 'adaptive_channels'
                    }
                }
            }
        ];
    }
})();
