(function() {
    'use strict';

    angular
        .module('app.account')
        .config(configure)
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper, $rootScope, $state, authService, $location) {
        var callback = $rootScope.$on('$stateChangeStart', checkAuth);
        callback; //to resolve "unused variable error"
        routerHelper.configureStates(getStates());

        function checkAuth(event, toState/*, toParams, fromState, fromParams*/) {
            var authenticated = authService.isLoggedIn();
            if ((typeof toState.allowed == "undefined" || !toState.allowed) && !authenticated){
                $state.go("login");
                event.preventDefault();
                return;
            }
            if (toState.url == "/login" && authenticated) {
                $state.go("feeders");
                event.preventDefault();
                return;
            }
        }
    }

    function getStates() {
        return [
            {
                state: 'login',
                config: {
                    url: '/login',
                    templateUrl: '/app/account/login-account.html',
                    controller: 'LoginController',
                    controllerAs: 'vm',
                    title: 'Sign In',
                    allowed: true
                }
            }
        ];
    }

    /* @ngInject */
    function configure($httpProvider) {
        $httpProvider.interceptors.push('interceptorService');
    }

})();
