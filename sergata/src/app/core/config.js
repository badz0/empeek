(function () {
    'use strict';

    var config = {
        apiBaseUrl: 'http://b2b.zixi.b.sergata.com',
//        apiBaseUrl: 'http://localhost:3000',
        sendDummyData: false,
        appErrorPrefix: '[liveLinearStreaming Error] ',
        appTitle: 'Live Linear Streaming'
    };

    angular.module('app.core')
        .config(toastrConfig)
        .config(translateConfig)
        .value('config', config)
        .config(configure);

    toastrConfig.$inject = ['toastr'];
    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": true,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "3000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
    }

    translateConfig.$inject = ['$translateProvider', 'LOCALES'];

    function translateConfig($translateProvider, LOCALES) {

        $translateProvider.useStaticFilesLoader({

                // prefix: 'http://localhost:3000/data/locale-',
                // suffix: '.json'
                prefix: '/data/locale-',
                suffix: '.json'
        });
        $translateProvider.preferredLanguage(LOCALES.preferredLocale);
        $translateProvider.useCookieStorage();
        $translateProvider.useSanitizeValueStrategy(null);
    }

    configure.$inject = ['$httpProvider', '$logProvider', '$provide', 'routerHelperProvider', 'exceptionHandlerProvider'];
    /* @ngInject */
    function configure($httpProvider, $logProvider, $provide, routerHelperProvider, exceptionHandlerProvider) {
        $httpProvider.defaults.withCredentials = true;

        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
       // exceptionHandlerProvider.configure(e);
        routerHelperProvider.configure({docTitle: config.appTitle + ': '});
        $provide.value("apiBaseUrl", config.apiBaseUrl);
        $provide.value("sendDummyData", config.sendDummyData);
    }

})();
