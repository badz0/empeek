(function () {
    'use strict';

    angular
        .module('app.clusters')
        .constant('clustersConstants',
            {
                scalingTypes: [
                    {name: 'Manual', key: 'Manual'}
                ]
            });
})();
