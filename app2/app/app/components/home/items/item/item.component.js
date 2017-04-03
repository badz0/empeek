(function() {
  'use strict';

  angular.module('home.items')
  .component('item', {
    templateUrl: 'app/components/home/items/item/item.html',
    controller: 'ItemController',
    bindings: {
      item: '<',
      numOfComments: '<'
    }
  });
})();