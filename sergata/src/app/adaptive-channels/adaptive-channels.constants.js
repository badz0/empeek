(function () {
    'use strict';

    angular
        .module('app.adaptive-channels')
        .constant('adaptiveChannelsConstants', {
            ChannelProperty: {

                mode: [{name: "USE_EXISTING_SOURCES", transcoding: false},
                    {name: "TRANSCODE_SINGLE_SOURCE", transcoding: true}]

            }
        });
})();
