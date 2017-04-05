(function () {
    'use strict';

    angular
        .module('app.domains')
        .factory('domainsService', domainsService);

    domainsService.$inject = ['$http', '$q', 'exception', 'constants', 'apiBaseUrl', 'sendDummyData'];

    function domainsService($http, $q, exception, constants, apiBaseUrl, sendDummyData) {
        var urls = constants.apiUrls;

        var service = {
            getDomains: getDomains,
            createDomain: createDomain,
            manageDomain: manageDomain
        };

        return service;

        function getDomains() {
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData =
                {
                    "success": true,
                    "domains": [
                        {
                            "name": "Zixi",
                            "dns_prefix": "b2b",
                            "admin_email": "admin@zixi.com"
                        },
                        {
                            "name": "	BBC",
                            "dns_prefix": "bbc",
                            "admin_email": "admin@bbc.com"
                        },
                        {
                            "name": "Bloomberg",
                            "dns_prefix": "bloom",
                            "admin_email": "admin@bloomberg.com"
                        }
                    ]
                };
                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.get(apiBaseUrl + urls.domains)
                    .then(success)
                    .catch(fail);

            }
        }

        function createDomain(model) {
            function success(response) {
                return response.data.domain_id;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData = {
                    "success": true,
                    "domain_id": 663
                };
                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.post(apiBaseUrl + urls.domains, model)
                    .then(success)
                    .catch(fail);
            }
        }

        function manageDomain(name) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }


            return $http.get(apiBaseUrl + '/impersonate/' + name)
                .then(success)
                .catch(fail);
        }
    }
})();
