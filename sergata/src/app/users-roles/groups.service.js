(function () {
    'use strict';

    angular
        .module('app.users-roles')
        .factory('groupsService', groupsService);

    groupsService.$inject = ['$http', '$q', 'constants', 'exception', 'apiBaseUrl', 'rolesService'];
    /* @ngInject */
    function groupsService($http, $q, constants, exception, apiBaseUrl, rolesService) {
        var urls = constants.apiUrls;
        var service = {
            getGroups: getGroups,
            deleteGroup: deleteGroup,
            createGroup: createGroup,
            getGroup: getGroup,
            addUserToGroup: addUserToGroup,
            removeUserFromGroup: removeUserFromGroup,
            getUsers: getUsers
        };

        return service;

        function getGroups() {
            return $http.get(apiBaseUrl + urls.groups)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function getGroup(group_id) {
            return $http.get(apiBaseUrl + urls.groups + '/' + group_id)
                .then(success)
                .catch(fail);

            function success(response) {
                for (var j = 0; j<response.data.data.length; ++j) {
                    for (var i = 0; i<response.data.data[j].roles.length; ++i) {
                        response.data.data[j].roles[i].permissions = rolesService.makePermissions(response.data.data[j].roles[i]);
                    }
                }
                return response.data.data[0];
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function createGroup(data) {
            return $http.post(apiBaseUrl + urls.groups + "/", data)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data.result;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function deleteGroup(group_id) {
            return $http.delete(apiBaseUrl + urls.groups + '/' + group_id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function getUsers() {
            return $http.get(apiBaseUrl + urls.users)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function addUserToGroup(group_id, user_id) {
            return $http.put(apiBaseUrl + urls.groups + "/" + group_id + "/user/" + user_id)
                .then(success)
                .catch(fail);

            function success(/*response*/) {
                return group_id;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function removeUserFromGroup(group_id, user_id) {
            return $http.delete(apiBaseUrl + urls.groups + "/" + group_id + "/user/" + user_id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getClusters')(e);
            }
        }
    }
})();
