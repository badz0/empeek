(function() {
  'use strict';

    angular.module('app', [
        'app.core',
        'app.widgets',
        'app.dashboard',
        'app.sources',
        'app.clusters',
        'app.adaptive-channels',
        'app.publishing-targets',
        'app.users-roles',
        'app.delivery-channels',
        'app.feeders',
        'app.settings',
        'app.layout',
        'app.events',
        'app.domains',
        'app.account'
    ])
    .config( [
        '$compileProvider',
        function( $compileProvider )
        {   
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data):/);
        }
    ]);

})();
