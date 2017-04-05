(function () {
    'use strict';

    angular
        .module('app.feeders')
        .constant('feedersConstants', {
            resource_tag: [
                {name: "West Coast Administrators"},
                {name: "East Coast Administrators"},
                {name: "Groupee"}],
            remote_access_key:[
                {name: "Any"},
                {name: "Default"},
                {name: "My Key 1"}]
        });
})();

