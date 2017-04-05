(function() {
    'use strict';

    angular
        .module('app.sources')
        .constant('sourcesConstant', {
            statuses: {
                "gray": 'Disabled',
                "green": 'OK',
                "yellow": 'Warning',
                "red": 'Error'
            },
            onlineStatuses: [
                {name: 'Offline'},
                {name: 'Online. Streaming'},
                {name: 'Online. StandBy'}
            ],
            feederInputs: [
                {id: 1, name: 'Encoder 01(UPD 2020)'},
                {id: 2, name: 'Encoder 02(UPD 2021)'},
                {id: 3, name: 'Encoder 03(UPD 2022)'}
            ]
        });
})();
