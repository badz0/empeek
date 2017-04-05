(function () {
    'use strict';

    angular
        .module('app.publishing-targets')
        .factory('publishingTargetsService', publishingTargets);

    publishingTargets.$inject = ['$http', 'constants', 'exception', 'apiBaseUrl'];
    function publishingTargets($http, constants, exception, apiBaseUrl) {

        var urls = constants.apiUrls;

        var service = {
            getAllTargets: getAllTargets,
            deleteSelectTarget: deleteSelectTarget,
            saveNewTarget: saveNewTarget,
            getDetailsTargets: getDetailsTargets,
            updatePublishingTarget: updatePublishingTarget,
            getResourceTags: getResourceTags
        };

        return service;

        function getResourceTags() {
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.get(apiBaseUrl + urls.adaptivechannels + '/resource_tags')
                .then(success)
                .catch(fail);

        }

        function getAllTargets() {

            return $http.get(apiBaseUrl + urls.publishingtargets)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function saveNewTarget(model) {
            function success(response) {
                return response.data.result;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }


            return $http.post(apiBaseUrl + urls.publishingtargets + "/", model)
                .then(success)
                .catch(fail);

        }

        function deleteSelectTarget(name) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }


            return $http.delete(apiBaseUrl + urls.publishingtargets + "/" + name)
                .then(success)
                .catch(fail);

        }

        function getDetailsTargets(target) {

            return $http.get(apiBaseUrl + urls.publishingtargets + "/" + target.name)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data.data[0];
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function updatePublishingTarget(name, model) {
            function success(response) {
                return response.data.result;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }


            return $http.put(apiBaseUrl + urls.publishingtargets + '/' + name, model)
                .then(success)
                .catch(fail);

        }
    }
})();
