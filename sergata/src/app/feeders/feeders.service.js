(function () {
    'use strict';

    angular
        .module('app.feeders')
        .factory('feedersService', feedersService);

    feedersService.$inject = ['$http', '$q', 'constants', 'exception', 'apiBaseUrl', '_'];
    function feedersService($http, $q, constants, exception, apiBaseUrl, _) {
        var urls = constants.apiUrls;

        var service = {
            getFeeders: getFeeders,
            getFeeder: getFeeder,
            getFeederById: getFeederById,
            addFeeder: addFeeder,
            updateFeeder: updateFeeder,
            deleteFeeder: deleteFeeder,
            getResourceTags:getResourceTags,
            getKeys:getKeys
        };

        return service;

        function getResourceTags() {
            return $http.get(apiBaseUrl + urls.feeders + '/resource_tags')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function getKeys() {
            return $http.get(apiBaseUrl + urls.accessKeys)
                .then(success)
                .catch(fail);

            function success(response) {
                return [{id: null,name:"Any"}].concat(response.data.data);
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function getFeeders() {
            return $http.get(apiBaseUrl + urls.feeders)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function getFeederById(id) {
            return getFeeders().then(success);

            function success(data) {
                return $q.when(_.find(data, function(x) {return x.id == id;}));
            }
        }

        function getFeeder(feeder) {
            return $http.get(apiBaseUrl + urls.feedersbyport + '/' + feeder.port)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data.data[0];
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function addFeeder(model) {
            return $http.post(apiBaseUrl + urls.feeders, model)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data.result;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function updateFeeder(feederName, model) {
            return $http.put(apiBaseUrl + urls.feeders + '/' + feederName, model)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data.result;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function deleteFeeder(feederName) {
            return $http.delete(apiBaseUrl + urls.feeders + '/' + feederName)
                .then(success)
                .catch(fail);

            function success() {
                return true;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }
    }
})();
