(function() {
  'use strict';

  angular
      .module('app.clusters')
      .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
      routerHelper.configureStates(getStates());
  }

  function getStates() {
      return [{
          state: 'clusters',
          config: {
              url: '/clusters',
              templateUrl: '/app/clusters/clusters.html',
              controller: 'ClustersController',
              controllerAs: 'vm',
              title: 'CLUSTERS',
              settings: {
                  nav: 4,
                  iconClass: 'fa fa-cloud',
                  is_child:true,
                  notificationsKey: 'broadcasters_clusters'
              }
          }
      }];
  }
})();
