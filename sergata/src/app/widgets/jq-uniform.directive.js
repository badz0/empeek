(function () {
    'use strict';

    angular
        .module('app.widgets')
        .directive('jqUniform', jqUniform);

    /* @ngInject */
    function jqUniform() {
        var directive = {
            link: link,
            restrict: "A"
        };
        return directive;

        function link(scope, element, attributes) {
            var uniformedElement = null;

            scope.$watch(attributes.ngModel, handleModelChange);

            scope.$on("$destroy", handleDestroy);

            function handleDestroy() {

                if (!uniformedElement) {
                    return;
                }
                uniformedElement.uniform.restore(uniformedElement);
            }

            function handleModelChange() {
                scope.$evalAsync(synchronizeUniform);
            }

            function synchronizeUniform() {
                if (!scope.$parent) {
                    return;
                }
                if (!uniformedElement) {
                    return ( uniformedElement = element.uniform() );
                }
                uniformedElement.uniform.update(uniformedElement);
            }
        }
    }
})();

