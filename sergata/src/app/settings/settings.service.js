(function () {
    'use strict';

    angular
        .module('app.settings')
        .factory('settingsService', settingsService);


    settingsService.$inject = ['$http', '$q', 'exception', 'constants', 'apiBaseUrl', 'sendDummyData', '_'];
    /* @ngInject */
    function settingsService($http, $q, exception, constants, apiBaseUrl, sendDummyData, _) {
        var urls = constants.apiUrls;
        sendDummyData = false; //for validation testing
        var service = {
            getAccessKeys: getAccessKeys,
            createAccessKey: createAccessKey,
            deleteAccessKey: deleteAccessKey,
            getAccount: getAccount,
            updateAccount: updateAccount,
            getDetails: getDetails,
            getAwsAccount: getAwsAccount,
            updateAccountAws:updateAccountAws
        };

        return service;

        function getAccessKeys() {
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }


            return $http.get(apiBaseUrl + urls.accessKeys)
                .then(success)
                .catch(fail);

        }

        function createAccessKey(name) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.post(apiBaseUrl + urls.accessKeys, name)
                .then(success)
                .catch(fail);

        }

        function deleteAccessKey(name) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.delete(apiBaseUrl + urls.accessKeys + '/' + name)
                .then(success)
                .catch(fail);

        }

        function getUser() {
            return $http.get(apiBaseUrl + constants.apiUrls.users + "/self")
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data.data.name;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function getDetails() {
            var promise = [getAccount(), getUser()];
            return $q.all(promise).then(success);

            function success(data) {
                return $q.when(_.find(data[0], function (x) {
                    return x.name == data[1];
                }));
            }
        }

        function getAccount() {
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }


            return $http.get(apiBaseUrl + urls.users)
                .then(success)
                .catch(fail);

        }

        function getAwsAccount(customer_id){
            var promise = [getAwsAccounts()];
            return $q.all(promise).then(success);

            function success(data) {
                return $q.when(_.find(data[0], function (x) {
                    return x.id == customer_id;
                }));
            }

        }
        
        function getAwsAccounts(){
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }


            return $http.get(apiBaseUrl + urls.customers)
                .then(success)
                .catch(fail);
        }


        function updateAccount(model) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData = {};
                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.put(apiBaseUrl + urls.users + '/self', model)
                    .then(success)
                    .catch(fail);
            }
        }

        function updateAccountAws(Name, model) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData = {};
                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.put(apiBaseUrl + urls.customers + '/'+ Name, model)
                    .then(success)
                    .catch(fail);
            }
        }

    }
})();
