(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('zxVerifPassword', zxVerifPassword);

    /* @ngInject */
    function zxVerifPassword() {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                otherValue: '=zxVerifPassword'
            },
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            ngModel.$validators.zxVerifPassword = function (value) {
                return value === scope.otherValue;
            };
            scope.$watch("otherValue", function () {
                ngModel.$validate();
            });
        }
    }
})();


