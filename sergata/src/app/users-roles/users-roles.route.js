(function () {
    'use strict';

    angular
        .module('app.users-roles')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'users-roles',
                config: {
                    url: '/users-roles',
                    templateUrl: '/app/users-roles/users-roles.html',
                    controller: 'UsersRolesController',
                    controllerAs: 'vm',
                    title: 'USERS_ROLES',
                    settings: {
                        nav: 10,
                        iconClass: 'fa fa-users',
                        childDefault: 'users-roles.roles'
                    }
                }
            }, {
                state: 'users-roles.roles',
                config: {
                    url: '/roles',
                    title: 'USERS_ROLES',
                    templateUrl: '/app/users-roles/roles.html',
                    controller: 'RolesController',
                    controllerAs: 'rolesVm',
                    tabSettings: {
                        tab: 1,
                        iconClass: 'fa fa-lock pr-10',
                        content: 'ROLES'
                    }
                }
            }, {
                state: 'users-roles.groups',
                config: {
                    url: '/groups',
                    title: 'USERS_ROLES',
                    templateUrl: '/app/users-roles/groups.html',
                    controller: 'GroupsController',
                    controllerAs: 'groupsVm',
                    tabSettings: {
                        tab: 2,
                        iconClass: 'fa fa-group pr-10',
                        content: 'USER_GROUPS'
                    }
                }
            }, {
                state: 'users-roles.users',
                config: {
                    url: '/users',
                    title: 'USERS_ROLES',
                    templateUrl: '/app/users-roles/users.html',
                    controller: 'UsersController',
                    controllerAs: 'usersVm',
                    tabSettings: {
                        tab: 3,
                        iconClass: 'fa fa-user pr-10',
                        content: 'USERS'
                    }
                }
            }
        ];
    }
})();
