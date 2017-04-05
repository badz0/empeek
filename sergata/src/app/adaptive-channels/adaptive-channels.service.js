(function () {
    'use strict';

    angular
        .module('app.adaptive-channels')
        .factory('adaptiveChannelService', adaptiveChannelService);

    adaptiveChannelService.$inject = ['$http', '$q', 'constants', 'adaptiveChannelsConstants', 'exception', 'apiBaseUrl'];
    /* @ngInject */
    function adaptiveChannelService($http, $q, constants, adaptiveChannelsConstants, exception, apiBaseUrl) {
        var urls = constants.apiUrls;

        var service = {
            getChannelsProperty: getChannelsProperty,
            getAllChannels: getAllChannels,
            getPublicTargets: getPublicTargets,
            getPublickTargetsChannel: getPublickTargetsChannel,
            saveNewChannel: saveNewChannel,
            updateChannel: updateChannel,
            deleteChannel: deleteChannel,
            getDetails: getDetails,
            assignPublishingTarget: assignPublishingTarget,
            deleteChannelTarget: deleteChannelTarget,
            getClusters: getClusters,
            getResourceTags: getResourceTags,
            getBroadcasters: getBroadcasters,
            getSources: getSources,
            getProfiles: getProfiles,
            addBitrate: addBitrate,
            deleteBitrate: deleteBitrate,
            updateBitrate: updateBitrate,
            getPublicClusters: getPublicClusters,
            getDetailsNewChannel: getDetailsNewChannel
        };

        return service;

        function getProfiles() {
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.get(apiBaseUrl + urls.profiles)
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

        function getResourceTags() {
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.get(apiBaseUrl + urls.adaptivechannels + '/resource_tags')
                .then(success)
                .catch(fail);

        }

        function getBroadcasters() {
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.get(apiBaseUrl + "/api/" + urls.broadcasters)
                .then(success)
                .catch(fail);

        }

        function getClusters() {
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.get(apiBaseUrl + urls.clusters + '?can_process=1')
                .then(success)
                .catch(fail);

        }

        function getPublicClusters() {
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

        function getChannelsProperty() {
            var data = adaptiveChannelsConstants.ChannelProperty;
            return $q.when(data);
        }

        function getDetails(channel) {
            function success(response) {
                return response.data.data[0];
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.get(apiBaseUrl + urls.adaptivechannels + "/" + channel.name)
                .then(success)
                .catch(fail);

        }

        function getDetailsNewChannel(id) {
            return getAllChannels().then(success);

            function success(data) {
                return $q.when(_.find(data, function (x) {
                    return x.id == id;
                }));
            }
        }

        function getAllChannels() {
            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.get(apiBaseUrl + urls.adaptivechannels)
                .then(success)
                .catch(fail);

        }

        function getPublicTargets() {

            return $http.get(apiBaseUrl + urls.publishingtargets)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function getPublickTargetsChannel(name) {

            return $http.get(apiBaseUrl + urls.getPublishingTargets + "/" + name)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }
        }

        function saveNewChannel(model) {
            function success(response) {
                return response.data.result;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.post(apiBaseUrl + urls.adaptivechannels + "/", model)
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


            return $http.delete(apiBaseUrl + urls.adaptivechannels + "/" + name)
                .then(success)
                .catch(fail);

        }

        function updateChannel(name, model) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }


            return $http.put(apiBaseUrl + urls.adaptivechannels + '/' + name, model)
                .then(success)
                .catch(fail);

        }

        function assignPublishingTarget(item, model) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }


            return $http.put(apiBaseUrl + urls.publishingtargets + "/" + item.name, model)
                .then(success)
                .catch(fail);

        }

        function deleteChannelTarget(channelName, targetName) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }


            return $http.delete(apiBaseUrl + "/publishing targets/" + targetName + "/adaptive_channel/" + channelName)
                .then(success)
                .catch(fail);

        }

        function addBitrate(channelName, model) {
            function success(response) {
                return response.data.result;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.post(apiBaseUrl + urls.adaptivechannels + "/" + channelName + "/bitrate", model)
                .then(success)
                .catch(fail);

        }

        function deleteBitrate(id) {
            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }


            return $http.delete(apiBaseUrl + urls.bitrate + "/" + id)
                .then(success)
                .catch(fail);

        }

        function updateBitrate(id, model) {
            function success(response) {
                return response.data.result;
            }

            function fail(e) {
                return exception.catcher('Error: ')(e);
            }

            return $http.put(apiBaseUrl + urls.bitrate + '/' + id, model)
                .then(success)
                .catch(fail);

        }

    }
})();
