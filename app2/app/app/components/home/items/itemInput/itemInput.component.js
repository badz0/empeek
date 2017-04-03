(function() {
    'use strict';

    angular.module('home.items')
    .component('itemInput', {
      templateUrl: 'app/components/home/items/itemInput/itemInput.html',
      controller: 'ItemInputController',
      bindings: {
        onSave: '&'
      }
    });

})();