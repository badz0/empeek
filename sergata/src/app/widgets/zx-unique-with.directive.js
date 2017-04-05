(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('zxUniqueWith', zxUniqueWith);

    /* @ngInject */
    function zxUniqueWith() {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                zxUniqueWith: '='
            },
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            element.bind('blur', function () {
                ngModel.$setValidity('unique', scope.zxUniqueWith !== element.val());
            });
        }
    }
})();
