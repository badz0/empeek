(function () {
    'use strict';

    angular
        .module('app.events')
        .factory('eventsService', eventsService);

    eventsService.$inject = ['$http', '$q', 'exception', 'constants', 'apiBaseUrl'];

    function eventsService($http, $q, exception, constants, apiBaseUrl){
        var urls = constants.apiUrls;
        var service = {
            getEvents: getEvents
        };

        return service;

        function getEvents(page, pageSize, fromDate, toDate, objectType, objectName, msgFilter) {
            function success(response) {
                return response.data.result;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            var filter = {
                page: page,
                pageSize: pageSize,
                fromDate: fromDate ? fromDate.toDate() : null, 
                toDate: toDate ? toDate.toDate() : null, 
                objectType: objectType,
                objectName: objectName,
                msgFilter: msgFilter
            }

            return $http.get(apiBaseUrl + urls.logs, {params: filter})
                .then(success)
                .catch(fail);
        }
    }
})();


