(function () {
    'use strict';

    angular
        .module('app.users-roles')
        .factory('usersService', usersService);

    usersService.$inject = ['$http', '$q', 'constants', 'exception', 'apiBaseUrl', 'rolesService'];
    /* @ngInject */
    function usersService($http, $q, constants, exception, apiBaseUrl, rolesService) {
        var urls = constants.apiUrls;
        var service = {
            getUsers: getUsers,
            getDetails: getDetails,
            saveNewUser: saveNewUser,
            deleteUser: deleteUser,
            updateUser: updateUser,
            getGroups: getGroups,
            addUserToGroup: addUserToGroup,
            removeUserFromGroup: removeUserFromGroup
        };
        return service;

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

        function getDetails(id) {
            return $http.get(apiBaseUrl + urls.users + '/' + id)
                .then(success)
                .catch(fail);

            function success(response) {
                var user = response.data.data[0]
                for (var g = 0; g<user.groups.length; ++g) {
                    for (var i = 0; i<user.groups[g].roles.length; ++i) {
                        user.groups[g].roles[i].permissions = rolesService.makePermissions(user.groups[g].roles[i]);
                        user.groups[g].roles[i].via = user.groups[g].name
                    }
                }
                for (var i = 0; i<user.roles.length; ++i) {
                    user.roles[i].permissions = rolesService.makePermissions(user.roles[i]);
                }

                // merge group and user roles
                user.combined_roles = _.flatten([user.roles, _.flatten(_.map(user.groups, 'roles'))])
                user.combined_roles = _.uniq(user.combined_roles, 'id')

                return user;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function saveNewUser(user) {
            return $http.post(apiBaseUrl + urls.users + "/", user)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data.result;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function deleteUser(id) {
            return $http.delete(apiBaseUrl + urls.users + "/" + id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function updateUser(id, model) {
            return $http.put(apiBaseUrl + urls.users + "/" + id, model)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

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
                return exception.catcher('Error: ')(e);
            }
        }
    }
})();
