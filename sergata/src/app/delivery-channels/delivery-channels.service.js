(function () {
    'use strict';

    angular
        .module('app.delivery-channels')
        .service('deliveryChannelsService', deliveryChannelsService);

    deliveryChannelsService.$inject = ['$http', '$q', 'constants', 'exception', 'apiBaseUrl', 'sendDummyData'];

    /* @ngInject */
    function deliveryChannelsService($http, $q, constants, exception, apiBaseUrl, sendDummyData) {

        var urls = constants.apiUrls;

        var service = {
            getDeliveryChannels: getDeliveryChannels,
            getDeliveryChannel: getDeliveryChannel,
            getPropertyChannel: getPropertyChannel,
            saveNewChannel: saveNewChannel,
            updateChannel: updateChannel,
            deleteChannel: deleteChannel,
            addZixiPush: addZixiPush,
            updateZixiPush: updateZixiPush,
            deleteZixiPush: deleteZixiPush,
            addZixiPull: addZixiPull,
            updateZixiPull: updateZixiPull,
            deleteZixiPull: deleteZixiPull,
            addRtmpPush: addRtmpPush,
            updateRtmpPush: updateRtmpPush,
            deleteRtmpPush: deleteRtmpPush,
            getEvents: getEvents
        };

        return service;

        function getDeliveryChannels() {
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.get(apiBaseUrl + urls.deliverychannels)
                .then(success)
                .catch(fail);

        }

        function getPropertyChannel() {
            var promises = [getResourceTags(), getOutputClusters(), getSources()];
            return $q.all(promises).then(function (data) {
                var property = [];
                property.resource_tags = data[0];
                property.clusters = data[1];
                property.sources = data[2];
                return property;
            });
        }

        function getResourceTags() {
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.get(apiBaseUrl + urls.resource_tags)
                .then(success)
                .catch(fail);
        }

        function getOutputClusters() {
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.get(apiBaseUrl + urls.clusters + '?can_output=1')
                .then(success)
                .catch(fail);
        }

        function getSources() {
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.get(apiBaseUrl + urls.sources)
                .then(success)
                .catch(fail);
        }

        function getDeliveryChannel(channel) {
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.get(apiBaseUrl + urls.deliverychannels + "/" + channel.name)
                .then(success)
                .catch(fail);
        }

        function saveNewChannel(model) {

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.post(apiBaseUrl + urls.deliverychannels + "/", model)
                .then(success)
                .catch(fail);
        }

        function deleteChannel(name) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.delete(apiBaseUrl + urls.deliverychannels + "/" + name)
                .then(success)
                .catch(fail);

        }

        function updateChannel(channel, model) {
            function success(response) {
                return response.data.result;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }


            return $http.put(apiBaseUrl + urls.deliverychannels + '/' + channel.name, model)
                .then(success)
                .catch(fail);
        }

        function addZixiPush(model) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.post(apiBaseUrl + urls.zixi_push + "/", model)
                .then(success)
                .catch(fail);

        }

        function deleteZixiPush(name) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.delete(apiBaseUrl + urls.zixi_push + "/" + name)
                .then(success)
                .catch(fail);

        }

        function updateZixiPush(channel, model) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.put(apiBaseUrl + urls.zixi_push + '/' + channel.name, model)
                .then(success)
                .catch(fail);

        }

        function addZixiPull(model) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.post(apiBaseUrl + urls.zixi_pull + "/", model)
                .then(success)
                .catch(fail);

        }

        function deleteZixiPull(name) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.delete(apiBaseUrl + urls.zixi_pull + "/" + name)
                .then(success)
                .catch(fail);

        }

        function updateZixiPull(item,model) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.put(apiBaseUrl + urls.zixi_pull + '/'+item.name, model)
                .then(success)
                .catch(fail);
          
        }

        function addRtmpPush(model) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.post(apiBaseUrl + urls.rtmp_push + "/", model)
                .then(success)
                .catch(fail);

        }

        function deleteRtmpPush(name) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.delete(apiBaseUrl + urls.rtmp_push + "/" + name)
                .then(success)
                .catch(fail);

        }

        function updateRtmpPush(item, model) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }


            return $http.put(apiBaseUrl + urls.rtmp_push + '/' + item.name, model)
                .then(success)
                .catch(fail);

        }

        function getEvents(channel) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            if (sendDummyData) {
                var dummyData = [
                    {
                        Id: "0",
                        Status: "red",
                        Type: "Target error",
                        DateTime: "2016-10-03T15:32:16",
                        Message: "Target 'GNN - S3 East' error - Timeout"
                    },
                    {
                        Id: "1",
                        Status: "green",
                        Type: "Target connected",
                        DateTime: "2016-10-02T12:32:16",
                        Message: "Target 'Some other CDN' connected"
                    },
                    {
                        Id: "2",
                        Status: "gray",
                        Type: "Target assigned",
                        DateTime: "2016-10-01T15:32:16",
                        Message: "Target 'Some other CDN' assigned"
                    },
                    {
                        Id: "3",
                        Status: "gray",
                        Type: "Target assigned",
                        DateTime: "2016-10-01T15:32:16",
                        Message: "Target 'GNN - S3 East' assigned"
                    },
                    {
                        Id: "4",
                        Status: "green",
                        Type: "Target connected",
                        DateTime: "2016-10-01T15:32:16",
                        Message: "Target 'GNN - Akamai' Connected"
                    },
                    {
                        Id: "5",
                        Status: "gray",
                        Type: "Target assigned",
                        DateTime: "2016-10-01T15:32:16",
                        Message: "Target 'GNN - Akamai' assigned"
                    },
                    {
                        Id: "6",
                        Status: "green",
                        Type: "Source connected",
                        DateTime: "2016-10-01T15:32:16",
                        Message: "Source 'GNN East' connected"
                    },
                    {
                        Id: "8",
                        Status: "gray",
                        Type: "Created",
                        DateTime: "2016-10-01T01:32:16",
                        Message: "Some other CDN"
                    }

                ];
                return $q.when({data: dummyData})
                    .then(success);
            } else {
                return $http.get(apiBaseUrl + urls.events + "/" + channel.name)
                    .then(success)
                    .catch(fail);
            }
        }
    }

})();

