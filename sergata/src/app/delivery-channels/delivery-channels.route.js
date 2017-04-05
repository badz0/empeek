(function () {
    'use strict';

    angular
        .module('app.delivery-channels')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'delivery-channels',
                config: {
                    url: '/delivery-channels',
                    templateUrl: '/app/delivery-channels/delivery-channels.html',
                    controller: 'DeliveryChannelsController',
                    controllerAs: 'vm',
                    title: 'DELIVERY_CHANNELS',
                    settings: {
                        nav: 8,
                        iconClass: 'fa fa-sign-out'
                        // notificationsKey: 'delivery_channels'
                    }
                }
            }
        ];
    }
})();
