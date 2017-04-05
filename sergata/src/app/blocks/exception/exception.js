(function () {
    'use strict';

    angular
        .module('blocks.exception')
        .factory('exception', exception);

    /* @ngInject */
    function exception($q, logger) {
        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            return function (e) {
                var thrownDescription;
                var newMessage;
                if (e.data) {
                    thrownDescription = '\n' + e.data.error;
                    //newMessage = message + thrownDescription;
                    logger.error('Error ' + thrownDescription);
                }

                return $q.reject(e);
            };
        }
    }
})();
