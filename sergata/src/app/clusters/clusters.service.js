(function () {
    'use strict';

    angular
        .module('app.clusters')
        .factory('clustersService', clustersService);

    clustersService.$inject = ['$q', '$http', 'constants', 'exception', 'apiBaseUrl', 'sendDummyData'];
    /* @ngInject */
    function clustersService($q, $http, constants, exception, apiBaseUrl, sendDummyData) {
        var urls = constants.apiUrls;
        var service = {
            getClusters: getClusters,
            getCluster: getCluster,
            addCluster: addCluster,
            updateCluster: updateCluster,
            deleteCluster: deleteCluster,
            getBroadcasters: getBroadcasters,
            getBroadcaster: getBroadcaster,
            addBroadcaster: addBroadcaster,
            updateBroadcaster: updateBroadcaster,
            deleteBroadcaster: deleteBroadcaster,
            getResourceTags: getResourceTags,
            getKeys: getKeys,
            getDetailNewCluster: getDetailNewCluster,
            getAws: getAws

        };

        return service;


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
                        {
                            "status": "green",
                            "id": 83,
                            "name": "US East",
                            "scaling_type": "aws",
                            "good_broadcasters": 8,
                            "bad_broadcasters": 0,
                            "roles": "processing,input",
                            "host_name": "<host>",
                            "resource_tag": "<resource_tag>",
                            "dns_prefix": "bloom1"
                        },
                        {
                            "status": "yellow",
                            "id": 91,
                            "name": "EU",
                            "scaling_type": "manual",
                            "good_broadcasters": 2,
                            "bad_broadcasters": 2,
                            "roles": "output",
                            "host_name": "<host>",
                            "resource_tag": "<resource_tag>",
                            "dns_prefix": "bloom2"
                        }
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

        function getDetailNewCluster(id) {
            return getClusters()
                .then(success)
                .catch(fail);

            function success(data) {
                return $q.when(_.find(data, function(x) {return x.id == id;}));
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function getCluster(dnsPrefix) {
            function success(response) {
                return response.data.data[0];
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData = {
                    "success": true,
                    "broadcasters_cluster": {
                        "status": "green",
                        "id": 91,
                        "name": "US East",
                        "scaling_type": "aws",
                        "good_broadcasters": 8,
                        "bad_broadcasters": 0,
                        "roles": "processing,input",
                        "host_name": "<host>",
                        "resource_tag": "<resource_tag>",
                        "dns_prefix": dnsPrefix
                    }
                };
                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.get(apiBaseUrl + urls.clusters + '/' + dnsPrefix)
                    .then(success)
                    .catch(fail);
            }
        }

        function addCluster(model) {
            function success(response) {
                return response.data.result;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData = {
                    "success": true,
                    "dnsPrefix": 'dummy'
                };
                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.post(apiBaseUrl + urls.clusters, model)
                    .then(success)
                    .catch(fail);
            }
        }

        function updateCluster(dnsPrefix, model) {
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
                return $http.put(apiBaseUrl + urls.clusters + '/' + dnsPrefix, model)
                    .then(success)
                    .catch(fail);
            }
        }

        function deleteCluster(dnsPrefix) {
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
                return $http.delete(apiBaseUrl + urls.clusters + '/' + dnsPrefix)
                    .then(success)
                    .catch(fail);
            }
        }

        function getBroadcasters(dnsPrefix) {
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData = {
                    "success": true,
                    "broadcasters": [
                        {
                            "status": "green",
                            "name": "CA 01",
                            "tunnel_port": "123",
                            "cpu": "45%",
                            "ram": "20%",
                            "is_enabled": true,
                            "history_url": "http://icinga2.zixi.com/dashboard-solo/script/transcoded_input.js?title=&host=echo2_zixi_com&service=AasthaTV_Arhant&command=Broadcaster_Input_Check&theme=light&panelId=2&"
                        },
                        {
                            "status": "red",
                            "name": "CA 02",
                            "tunnel_port": "456",
                            "cpu": "45%",
                            "ram": "20%",
                            "is_enabled": false,
                            "history_url": "http://icinga2.zixi.com/dashboard-solo/script/transcoded_input.js?title=&host=echo2_zixi_com&service=AasthaTV_Arhant&command=Broadcaster_Input_Check&theme=light&panelId=2&"
                        }
                    ]
                };
                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.get(apiBaseUrl + urls.clusters + '/' + dnsPrefix + urls.broadcasters)
                    .then(success)
                    .catch(fail);
            }
        }

        function getBroadcaster(dnsPrefix, broadcasterPort) {
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData = {
                    "success": true,
                    "broadcasters": {
                        "status": "green",
                        "name": "CA 01",
                        "broadcaster_cluster": "EU",
                        "streaming_ip": "123.456.789",
                        "resource_tag": "<tag>",
                        "is_auto_detect": false,
                        "api_user": "username",
                        "api_psaaword": "pass",
                        "remote_access_key": "<key>",
                        "tunnel_port": "1234",
                        "state": "pending|active|disabled",
                        "last_error_reported": "event_id",
                        "is_active": true,
                        "cpu": "45%",
                        "ram": "20%",
                        "is_enabled": true
                    }
                };
                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.get(apiBaseUrl + urls.broadcasters + '/' + broadcasterPort)
                    .then(success)
                    .catch(fail);
            }
        }

        function addBroadcaster(model) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData = {
                    "success": true,
                    "port": 2088
                };
                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.post(apiBaseUrl + '/api' + urls.broadcasters, model)
                    .then(success)
                    .catch(fail);
            }
        }

        function updateBroadcaster(broadcasterPort, model) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData = {
                    "success": true,
                    "port": 2088
                };
                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.put(apiBaseUrl + '/api' + urls.broadcasters + '/' + broadcasterPort, model)
                    .then(success)
                    .catch(fail);
            }
        }

        function deleteBroadcaster(broadcasterName) {
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
                return $http.delete(apiBaseUrl + '/api' + urls.broadcasters + '/' + broadcasterName)
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
                return $http.get(apiBaseUrl + '/api' + urls.broadcasters + '/resource_tags')
                    .then(success)
                    .catch(fail);
            }
        }

        function getKeys() {
            function success(response) {
                return [{id: null,name:"Any"}].concat(response.data.data);
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData = {
                    "success": true,
                    "data": [
                        {
                            "id": 1,
                            "customer_id": 4,
                            "name": "sergata_default",
                            "rsa_public": "ras_public",
                            "rsa_private": "rsa_private",
                            "created_at": null,
                            "updated_at": null,
                            "last_error_reported": null,
                            "is_enabled": 1,
                            "is_deleted": 0
                        },
                        {
                            "id": 2,
                            "customer_id": 4,
                            "name": "multilocker",
                            "rsa_public": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDje95rig/Rtu4ImxCHW3PhpD8ECjuCT+GsgxMlrHraVpMQ6dymM+je6KrAfSvQ0YmTPCwCTBk3Cucf4aXmTvlqSdHf4wtgpx3XCQNJe5Pr6Gqb6j/Ulf/wqWdat/kIb2fySBEFBMnxn8ttHmsIUpXUgRXqkKvTv1jrDd45DK1XbGJ0lQNhz67THG1PT1jqIotIUFc/uRf3o+3QiEJJKRv7qHnw4UykMMSfyXd4hAH2hoRP7ZpLe73sDPWBmxJHnjdRodBdIRV+n4b5YqnQgT4c4nAsKLKftgYdUCDA9/zyA1Y6fOuHUHVJ6Uqqxjp8LAj3VUpbctkImLBK6Ws8UO2N",
                            "rsa_private": "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA43vea4oP0bbuCJsQh1tz4aQ/BAo7gk/hrIMTJax62laTEOnc\npjPo3uiqwH0r0NGJkzwsAkwZNwrnH+Gl5k75aknR3+MLYKcd1wkDSXuT6+hqm+o/\n1JX/8KlnWrf5CG9n8kgRBQTJ8Z/LbR5rCFKV1IEV6pCr079Y6w3eOQytV2xidJUD\nYc+u0xxtT09Y6iKLSFBXP7kX96Pt0IhCSSkb+6h58OFMpDDEn8l3eIQB9oaET+2a\nS3u97Az1gZsSR543UaHQXSEVfp+G+WKp0IE+HOJwLCiyn7YGHVAgwPf88gNWOnzr\nh1B1SelKqsY6fCwI91VKW3LZCJiwSulrPFDtjQIDAQABAoIBAQCOHqUmqmqXqqGr\n3rTE2+3Z2rND4uCq2R00me8sakWWgt/+gRzI+UVTfiiveYQWQdKhmcYk6UYXjUg4\nMtFiwZQxQ01Lgp1pFP8fiRH0prATgnCYWBDoz43G3Q8lLir3iiJ2y29Wo1dHDX4Z\n/hcAbBgPW1ZF5Xx0Hed/cnqTSchCBNbnUz72EdrcCxg2SRXR/KgXeK8Mpactlrkf\nKelTZOLj87P36SDgQdhX9xRvCJT0o3O4WrDJD+7uJ89AGDP+B5MSKElg66xjeRiu\nJm8d046YMWsnyEcGi8gt9ZfyHlDLpY5Hdswp3vDz9DYXtMWIUXakKedIi1htykX8\nAwXoK+xBAoGBAPxp1JZIJ7pWvbV7ZR2/UJ9v3vOHAzYmW6cHW3uENQfklpp9NXW5\nTFEkitWMU7aMavELb0zglj9davAqKkXJbuAby0tMhW0D2ufV6QAiiNyFLi3hNepY\nMHAMqFpvM5nEHFRH6+vEgWqgJ2myC4TKMQpjfA8ziwSRzB+a2fQejs7nAoGBAOa3\nWwwapr+tputwd8+OV+keXYqA2/kbOW3Dp18LsTaMX9qTzUw0Z3LR4dGaYBaceY9K\nzkbKoR4hpfBIsDKxofqDZbQgLrt+CPjtqOX5+7RzlwbP4PubVkaSuFggzxLJH5FS\neN3xjr+3OvabBltHMewimdWzcZPhuVWGfOVjrJVrAoGAGnyMdzyZFp+Vhp6tLKLv\ntdtKXOmU97Csu2k1O0/TNMHS3+E1o+XO0VDxVJlGC4jOi/60Li/+9CU8XHlAOFR7\n0v53pa4g7iCSbvNuYLo+/EzpXJ0eSDn60zcwz1SN6JvAkUN+yR20qtilahzpwoRp\nAvsPgJTbCJ63+bUJG+m8+I8CgYAePX4zkfK1QP+V8IHjtJaVOaOtGcK7XfQjDPgN\nHy01JyURMzo/eMbuZ9AfdwqNLClKvNVYtgp0NpjXa8+cdWfzu/FCsM0vSg/HAO+Y\nZTG2r0fmXqzwjaW7TlPXSUWbAr2egJ7TCGxbeJrD5AHrSOOkPczIE+MZLQbrzNrl\n/jCKzQKBgDfSF1JS1mmYKD3FSi6oDZfTQKdohrXiN4YRmolMeJtqMRHwBvWR37xQ\nrXW++fB608PkhPiy4vOJGqkpZ0i+++CLNLQlHq/zRwOcOGzW3TjA6tkLvaAXFkxU\nupS60Tw78o8Vp4ob0CBeHdwn8E/EUagx5T2Z4Zdg6rI7aZ+4Qymq\n-----END RSA PRIVATE KEY-----\n",
                            "created_at": "2016-12-06T11:37:22.000Z",
                            "updated_at": "2016-12-06T11:37:22.000Z",
                            "last_error_reported": null,
                            "is_enabled": 1,
                            "is_deleted": 0
                        }
                    ]
                };

                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.get(apiBaseUrl + urls.accessKeys)
                    .then(success)
                    .catch(fail);
            }
        }
        function getAws(){
            function success(response) {
                return response.data.result;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData = {
                    "status": "OK",
                    "result": {
                        "r1": {
                            "name": "US East (N. Virginia)",
                            "vpcs": {
                                "v1": {
                                    "name": "Default (vpc-76512399)",
                                    "subnets": {
                                        "s1": "subnet-r62f612a (10.9.0.0/16)",
                                        "s2": "subnet-r62f612b (10.10.0.0/16)",
                                        "s3": "subnet-r62f612c (10.11.0.0/16)"
                                    }
                                },
                                "v2": {
                                    "name": "Privatex (vpc-76522399)",
                                    "subnets": {
                                        "s9": "subnet-aw8833dj (10.30.0.0/16)",
                                        "s10": "subnet-aw8834dj (10.31.0.0/16)"
                                    }
                                }
                            }
                        },
                        "r3": {
                            "name": "US West (Oregon)",
                            "vpcs": {
                                "v13": {
                                    "name": "xDefault (vpc-76512309)",
                                    "subnets": {
                                        "s1": "xsubnet-r62f612a (10.9.0.0/16)",
                                        "s2": "xsubnet-r62f612b (10.10.0.0/16)",
                                        "s3": "xsubnet-r62f612c (10.11.0.0/16)"
                                    }
                                },
                                "v26": {
                                    "name": "qPrivatex (vpc-76512999)",
                                    "subnets": {
                                        "s9": "xsubnet-aw8833dj (10.30.0.0/16)",
                                        "s10": "xsubnet-aw8834dj (10.31.0.0/16)"
                                    }
                                }
                            }
                        },
                        "r7": {
                            "name": "EU (Ireland)",
                            "vpcs": {
                                "v1": {
                                    "name": "zDefault (vpc-76576399)",
                                    "subnets": {
                                        "s1": "fsubnet-r62f612a (10.9.0.0/16)",
                                        "s2": "ysubnet-r62f612b (10.10.0.0/16)",
                                        "s3": "zsubnet-r62f612c (10.11.0.0/16)"
                                    }
                                },
                                "v5": {
                                    "name": "rPrivatex (vpc-76588399)",
                                    "subnets": {
                                        "s9": "jsubnet-aw8833dj (10.30.0.0/16)",
                                        "s10": "msubnet-aw8834dj (10.31.0.0/16)"
                                    }
                                }
                            }
                        }
                    }
                };

                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.get(apiBaseUrl + urls.aws)
                    .then(success)
                    .catch(fail);
            }
        }
    }
})();
