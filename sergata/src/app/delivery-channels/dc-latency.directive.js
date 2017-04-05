(function () {
    'use strict';

    angular
        .module('app.delivery-channels')
        .directive('dcLatency', dcLatency);
    /* @ngInject */
    dcLatency.$inject =['$translate'];

    function dcLatency($translate) {
        var directive = {
            link: link,
            restrict: 'A',
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ctrl) {
            var translateLatency='';
            $translate('REMOTE_CONFIGURATION')
                .then(function (translatedValue) {
                    translateLatency = translatedValue;
                });
            
            function latency(value) {
                if (value && !/[\d]/i.test(value) || (value === 0) || (value === '0')) {
                    ctrl.$setViewValue(translateLatency);
                    ctrl.$render();
                    return translateLatency;
                }
                else {
                    if (value == undefined) return '';
                    if (angular.isNumber(value)) {
                        value = value + '';
                    }

                    var transformedInput = value.replace(/[^0-9]/g, '');
                    if (transformedInput != value) {
                        ctrl.$setViewValue(transformedInput);
                        ctrl.$render();
                    }
                    return transformedInput;
                }
            }

            ctrl.$formatters.push(latency);
            ctrl.$parsers.splice(0, 0, latency);
        }
    }

})();


