(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('zxHttpPrefix', zxHttpPrefix);

    /* @ngInject */
    function zxHttpPrefix() {
        var directive = {
            require: 'ngModel',
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs, controller) {
            function ensureHttpPrefix(value) {
                if (value && !/^([h]?[t]?[t]?[p]?[s]?):(\/\/)?.+/i.test(value)
                    && 'http://'.indexOf(value) === -1 && 'https://'.indexOf(value) === -1) {
                    scope.$watch(attrs.isHttps, function (is_https) {
                        if (is_https) {
                            controller.$setViewValue('https://' + value);
                            controller.$render();
                            return 'https://' + value;
                        } else {
                            controller.$setViewValue('http://' + value);
                            controller.$render();
                            return 'http://' + value;
                        }
                    })
                }
                else
                    return value;
            }

            controller.$formatters.push(ensureHttpPrefix);
            controller.$parsers.splice(0, 0, ensureHttpPrefix);

        }
    }


})();


