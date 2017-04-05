(function () {
    'use strict';

    angular
        .module('app.sources')
        .factory('sourcesService', sourcesService);

    sourcesService.$inject = ['$http', '$q', 'exception', 'constants', 'apiBaseUrl', 'sendDummyData'];
    /* @ngInject */
    function sourcesService($http, $q, exception, constants, apiBaseUrl, sendDummyData) {
        var urls = constants.apiUrls;
        var service = {
            getSources: getSources,
            getSource: getSource,
            createSource: createSource,
            updateData: updateData,
            deleteSource: deleteSource,
            getResourceTags: getResourceTags,
            getClusters: getClusters,
            getFeeders: getFeeders,
            getFeederInputs: getFeederInputs,
            getDetailNewSource: getDetailNewSource
        };

        return service;

        function getSources() {
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData = {
                    "success": true,
                    "sources": [
                        {"status": "green","name": "USA source","feeder": "Unmanaged","feeder_input": "Encoder 02(UPD 2021)","input_cluster": "US East 02","password": "qwerty","source_ip": "123.456.789","resource_tag": "West Coast Administrators","online_status": "ONLINE. STREAMING","img_src": "images/thumbs/thumb-1.jpg","history_url": "http://icinga2.zixi.com/dashboard-solo/script/transcoded_input.js?title=&host=echo2_zixi_com&service=AasthaTV_Arhant&command=Broadcaster_Input_Check&theme=light&panelId=2&"},
                        {"status": "red","name": "EU source","feeder": "Unmanaged","feeder_input": "Encoder 01(UPD 2020)","input_cluster": "US West","password": "qwerty1","source_ip": "876.654.321","resource_tag": "East Coast Administrators","online_status": "OFFLINE. SINCE:12-MAR-2016","img_src": "images/thumbs/thumb-2.jpg","history_url": "http://icinga2.zixi.com/dashboard-solo/script/transcoded_input.js?title=&host=echo2_zixi_com&service=AasthaTV_Arhant&command=Broadcaster_Input_Check&theme=light&panelId=2&"}
                    ]
                };
                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.get(apiBaseUrl + urls.sources)
                    .then(success)
                    .catch(fail);
            }
        }

        function getSource(name) {
            function success(response) {
                return response.data.data[0];
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData = {
                    "success": true,
                    "source": {"status": "green","name": name,"feeder": "Unmanaged","feeder_input": "Encoder 01(UPD 2020)","input_cluster": "US East 02","password": "qwerty","source_ip": "123.456.789","resource_tag": "West Coast Administrators","last_error_reported": "event","is_enabled": true,"img_src": "images/thumbs/thumb-1.jpg","events": [{        "id": "1","type": "Created","date": "Mon, Oct 2016 01:32:16 GMT","message": "Source US West Source created"    }],"history_url": "http://icinga2.zixi.com/dashboard-solo/script/transcoded_input.js?title=&host=echo2_zixi_com&service=AasthaTV_Arhant&command=Broadcaster_Input_Check&theme=light&panelId=2&"}
                };
                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.get(apiBaseUrl + urls.sources + '/' + name)
                    .then(success)
                    .catch(fail);
            }
        }

        function getDetailNewSource(id) {
            return getSources()
                .then(success)
                .catch(fail);

            function success(data) {
                return $q.when(_.find(data, function(x) {return x.id == id;}));
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function createSource(model) {
            function success(response) {
                return response.data.result;

            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData = {
                    "success": true,
                    "source_id": 663
                };
                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.post(apiBaseUrl + urls.sources, model)
                    .then(success)
                    .catch(fail);
            }
        }

        function updateData(name, model) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData = {
                    "success": true
                };
                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.put(apiBaseUrl + urls.sources + '/' + name, model)
                    .then(success)
                    .catch(fail);
            }
        }

        function deleteSource(name) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData = {
                    "success": true
                };
                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.delete(apiBaseUrl + urls.sources + '/' + name)
                    .then(success)
                    .catch(fail);
            }
        }

        function getResourceTags() {
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData = {
                    "status": "OK",
                    "data": [
                        {
                            "id": 1,
                            "customer_id": 4,
                            "name": "sergata_tag_1",
                            "created_at": null,
                            "updated_at": null,
                            "last_error_reported": null,
                            "is_enabled": 1,
                            "is_deleted": 0
                        },
                        {
                            "id": 2,
                            "customer_id": 4,
                            "name": "sergata_tag_2",
                            "created_at": null,
                            "updated_at": null,
                            "last_error_reported": null,
                            "is_enabled": 1,
                            "is_deleted": 0
                        }
                    ]
                };

                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.get(apiBaseUrl + urls.sources + '/resource_tags')
                    .then(success)
                    .catch(fail);
            }
        }

        function getClusters() {
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData = {
                    "success": true,
                    "data": [
                        { "status": "green", "id": 83, "name": "US East", "scaling_type": "aws", "good_broadcasters": 8, "bad_broadcasters": 0, "roles": "processing,input", "host_name": "<host>", "resource_tag": "<resource_tag>", "dns_prefix": "bloom1" },
                        { "status": "yellow", "id": 91, "name": "EU", "scaling_type": "manual", "good_broadcasters": 2, "bad_broadcasters": 2, "roles": "output", "host_name": "<host>", "resource_tag": "<resource_tag>", "dns_prefix": "bloom2" }
                    ]
                };
                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.get(apiBaseUrl + urls.clusters)
                    .then(success)
                    .catch(fail);
            }
        }

        function getFeeders() {
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData = {
                    "success": true,
                    "data": [
                        {
                            "status": "green",
                            "name": "CA 01",
                            "tunnel_port": "1234",
                            "cpu": "45%",
                            "ram": "20%",
                            "is_enabled": true,
                            "instance_id": "SycfrZJfg"

                        },
                        {
                            "status": "red",
                            "name": "CA 02",
                            "tunnel_port": "456",
                            "cpu": "45%",
                            "ram": "20%",
                            "is_enabled": false,
                            "instance_id": "SycfrZJfg"
                        }
                    ]
                };

                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.get(apiBaseUrl + urls.feeders)
                    .then(success)
                    .catch(fail);
            }
        }

        function getFeederInputs(feeder) {
            function success(response) {
                return response.data.data[0].inputs;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.get(apiBaseUrl + urls.feeders + '/' + feeder + '?getAllDetails=true')
                .then(success)
                .catch(fail);
        }
    }
})();
