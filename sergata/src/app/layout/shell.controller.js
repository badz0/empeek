(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('ShellController', ShellController);

    ShellController.$inject = ['$rootScope', '$cookies', '$timeout', 'config', '$translate', 'LOCALES'];
    /* @ngInject */
    function ShellController($rootScope, $cookies,$timeout, config, $translate, LOCALES) {
        var vm = this;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        $rootScope.showSplash = true;
        vm.navline = {
            title: config.appTitle
        };

        vm.locale = LOCALES.locales;
        vm.language = LOCALES.preferredLocale;
        vm.changeLanguage = changeLanguage;

        function changeLanguage() {
            $translate.use(vm.language);
        }

        activate();

        function activate() {
            hideSplash();
            getLanguages();
        }

        function getLanguages() {
            var storLang=$cookies.get('NG_TRANSLATE_LANG_KEY');
            if(storLang){
                vm.language = JSON.parse(storLang);
            }
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function () {
                $rootScope.showSplash = false;
            }, 500);
        }
    }
})();
