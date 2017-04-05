(function () {
    'use strict';

    angular
        .module('app.events')
        .directive('zixiEvents', eventsDirective);

    eventsDirective.$inject = ['$q', 'logger', 'eventsService', '$state'];
    /* @ngInject */
    function eventsDirective($q, logger, eventsService, $state) {
        var directive = {
            link: link,
            restrict: 'E',
            scope: {
                objectType: '@',
                objectName: '@',
                showPagination: '@',
                showControls: '@'
            },
            templateUrl: '/app/events/events.table.html',
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
            scope.pagesRange = [-5,-4,-3,-2,-1,0,1,2,3,4,5]
            scope.maxPage = 1
            scope.page = 1
            scope.currentPageSize = scope.pageSize = 15
            scope.fromDate = null
            scope.toDate = null
            scope.msgFilter = null
            scope.objectTypes = [
                {name: 'ANY', type: undefined},
                {name: 'FEEDERS', type: 'feeder'},
                {name: 'CLUSTERS', type: 'broadcaster_cluster'},
                {name: 'SOURCES', type: 'source'},
                {name: 'ADAPTIVE_CHANNELS', type: 'adaptive_channel'},
                {name: 'DELIVERY_CHANNELS', type: 'delivery_channel'}
            ]

            scope.$watch('objectName', function (objectName) {
              scope.reloadEvents();
            });

            loadEvents()

            function loadEvents() {
                delete scope.events

                eventsService.getEvents(scope.page, scope.pageSize, scope.fromDate, scope.toDate, scope.objectType, scope.objectName, scope.msgFilter)
                .then(function (response) {
                    scope.events = response
                    scope.currentPageSize = scope.pageSize
                });
            }

            scope.nextPage = function () {
                scope.page += 1

                if (scope.page > scope.maxPage) {
                    eventsService.getEvents(scope.page, scope.pageSize, scope.fromDate, scope.toDate, scope.objectType, scope.objectName, scope.msgFilter)
                    .then(function (response) {
                        scope.events = _(scope.events).concat(response)
                        scope.maxPage += 1
                    });
                }
            }

            scope.prevPage = function () {
                if (scope.page == 1)
                    return;
                scope.page -= 1
            }

            scope.setPage = function (p) {
                scope.page = p
            }

            scope.reloadEvents = function () {
                scope.page = 1
                scope.maxPage = 1
                loadEvents()
            }

            scope.clearFilter = function () {
                scope.fromDate = null
                scope.toDate = null
                scope.objectType = undefined
                scope.msgFilter = null
            }
        }
    }
})();
