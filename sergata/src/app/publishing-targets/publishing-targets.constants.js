(function () {
    'use strict';

    angular
        .module('app.publishing-targets')
        .constant('publishingTargetsConstants', {
            resource_tag: [
                {name: "West Coast Administrators"},
                {name: "East Coast Administrators"},
                {name: "Groupee"}]
        });
})();
