(function () {
    'use strict';

    angular
        .module('app.users-roles')
        .factory('rolesService', rolesService);

    rolesService.$inject = ['$http', '$q', 'constants', 'exception', 'apiBaseUrl'];
    /* @ngInject */
    function rolesService($http, $q, constants, exception, apiBaseUrl) {
        var urls = constants.apiUrls;

        var service = {
            getRoles: getRoles,
            getRole: getRole,
            createRole: createRole,
            updateRole: updateRole,
            deleteRole: deleteRole,
            removeGroupFromRole: removeGroupFromRole,
            removeUserFromRole: removeUserFromRole,
            assignGroupToRole: assignGroupToRole,
            assignUserToRole: assignUserToRole,
            getResourceTags: getResourceTags,

            makePermissions: makePermissions
        };

        return service;

        function getResourceTags() {
            return $http.get(apiBaseUrl + urls.resource_tags)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function makePermissions(role) {
            return [
                {
                    "sources": {
                        "access_level": role.source_edit ? 2 : role.source_view,
                        "notify": role.source_notify == 1
                    }
                }, {
                    "delivery_channels": {
                        "access_level": role.delivery_edit ? 2 : role.delivery_view,
                        "notify": role.delivery_notify == 1
                    }
                }, {
                    "adaptive_channels": {
                        "access_level": role.adaptive_edit ? 2 : role.adaptive_view,
                        "notify": role.adaptive_notify == 1
                    }
                }, {
                    "clusters": {
                        "access_level": role.clusters_edit ? 2 : role.clusters_view,
                        "notify": role.clusters_notify == 1
                    }
                }
            ];
        }

        function getRoles() {
            return $http.get(apiBaseUrl + urls.roles)
                .then(success)
                .catch(fail);

            function success(response) {
                for (var i = 0; i<response.data.data.length; ++i) {
                    response.data.data[i].permissions = makePermissions(response.data.data[i]);
                }
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function getRole(id) {
            return $http.get(apiBaseUrl + urls.roles + '/' + id)
                .then(success)
                .catch(fail);

            function success(response) {
                response.data.data[0].permissions = makePermissions(response.data.data[0]);
                return response.data.data[0];
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function createRole(model){
            return $http.post(apiBaseUrl + urls.roles + '/', model)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data.result;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function updateRole(role_id, model) {
            return $http.put(apiBaseUrl + urls.roles + '/' + role_id, model)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function deleteRole(role_id) {
            return $http.delete(apiBaseUrl + urls.roles + '/' + role_id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function removeGroupFromRole(role_id, group_id) {
            return $http.delete(apiBaseUrl + urls.roles + '/' + role_id + '/groups/' + group_id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function removeUserFromRole(role_id, user_id) {
            return $http.delete(apiBaseUrl + urls.roles + '/' + role_id + '/user/' + user_id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function assignGroupToRole(role_id, group_id) {
            return $http.put(apiBaseUrl + urls.roles + '/' + role_id + '/groups/' + group_id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data.result[0];
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function assignUserToRole(role_id, user_id) {
            return $http.put(apiBaseUrl + urls.roles + '/' + role_id + '/user/' + user_id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }
    }
})();
