(function () {
    'use strict';

    angular
        .module('app.events')
        .controller('EventsController', EventsController);

    EventsController.$inject = ['$q', '$sce', '$uibModal', '$cookies', '_', 'eventsService', 'constants', 'helpers', 'logger'];

    /* @ngInject */
    function EventsController($q, $sce, $uibModal, $cookies, _, eventsService, constants, helpers, logger) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
        }
    }
})();


