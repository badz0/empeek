(function () {
    'use strict';

    angular
        .module('blocks.helpers')
        .factory('helpers', helpers);

    helpers.$inject = ['_'];

    /* @ngInject */
    function helpers(_) {
        var service = {
            findIndexOfArray: findIndexOfArray
        };

        return service;

        function findIndexOfArray(array, key, value) {
            return _.findIndex(array, function (item) {
                return item[key] === value;
            })
        }
    }
}());
