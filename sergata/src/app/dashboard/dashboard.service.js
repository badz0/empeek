(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .factory('dashboardService', dashboardService);

    dashboardService.$inject = ['$http', '$q', 'exception', 'constants', 'apiBaseUrl', 'sendDummyData'];

    function dashboardService($http, $q, exception, constants, apiBaseUrl, sendDummyData){
        var urls = constants.apiUrls;
        var service = {
            getStatuses: getStatuses,
            getIssues: getIssues
        };

        return service;

        function getStatuses(){
            function success(response) {
                return response.data.result;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

           
                return $http.get(apiBaseUrl + urls.statuses)
                    .then(success)
                    .catch(fail);
            
        }

        function getIssues(){
            function success(response) {
                return response.data.result;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
            if (sendDummyData) {
                var dummyData =
                {
                    "success": true,
                    "issues": [
                        {
                            "message": "Broadcaster 'CA 01'@'EU Ireland' - Conenction Error"
                        },
                        {
                            "message": "Target 'GNN - S3 East' - Timeout"
                        }
                    ]
                };
                return $q.when({data: dummyData})
                .then(success);
            } else{
                return $http.get(apiBaseUrl + urls.issues)
                .then(success)
                .catch(fail);
            }
        }
    }
})();


