(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('zxIconStatusClass', zxIconStatusClass);

    /* @ngInject */
    function zxIconStatusClass() {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            var icn = angular.element(element);

            function removeAddClass(value) {
                icn.removeClass('status-no status-good status-med status-bad');
                icn.addClass(value);
            }

            scope.$watchGroup([attrs.zxIconStatusClass, attrs.isEnabled], function (value) {
                if (value[1] || (value[1] == undefined)) {
                    switch (value[0]) {
                        case "good":
                        case "success":
                        case "green":
                            removeAddClass('status-good');
                            break;
                        case "warning":
                            removeAddClass('status-med');
                            break;
                        case "bad":
                        case "error":
                        case "red":
                            removeAddClass('status-bad');
                            break;
                        case "disabled":
                        case "info":
                        case "gray":
                            removeAddClass('status-no');
                            break;
                    }
                } else {
                    removeAddClass('status-no');
                }
            })
        }
    }
})();

