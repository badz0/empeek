/* global toastr:false, moment:false */
(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('_', _)
        .constant('cryptoJS', CryptoJS)
        .constant('jwplayerkey', "nB1YVF1+kxdFqoZqjuZqCrDXvgqrdmGjgYex+7ZiXtI=")
        .constant('constants', {
            statuses: {
                "disabled": 'DISABLED',
                "good": 'OK',
                "warning": 'WARNING',
                "bad": 'ERROR'
            },
            apiUrls: {
                adaptivechannels: '/api/adaptive_channels',
                deliverychannels: '/api/delivery_channels',
                getPublishingTargets: '/api/publishing_targets/list_by_adaptive_channel',
                publishingtargets: '/api/publishing_targets',
                clusters: '/api/broadcasters_clusters',
                cluster: '/api/broadcasters_cluster',
                broadcasters: '/broadcasters',
                broadcaster: '/broadcaster',
                feeders: '/api/feeders',
                zixi_pull: '/api/zixi_pull',
                zixi_push: '/api/zixi_push',
                rtmp_push: '/api/rtmp_push',
                bitrate: '/api/bitrate',
                customers: '/api/customers',
                feedersbyport: '/api/feeders_by_port',
                resource_tags: '/api/resource_tag',
                sources: '/api/sources',
                source: '/api/source',
                groups: '/api/groups',
                roles: '/api/roles',
                users: '/api/user',
                login: '/login',
                logout: '/logout',
                profiles: '/api/transcoding_profiles',
                accessKeys: '/api/access_keys',
                account: '/api/account',
                domains: '/api/customers',
                statuses: '/event/aggregated/',
                issues: '/event/current_issues',
                logs: '/event',
                aws: '/api/aws'
            }

        })
        .constant('LOCALES', {
            'locales': {
                'ua': 'LANG_BTN_UA',
                'en': 'LANG_BTN_EN'
            },
            'preferredLocale': 'en'
        });
})();
