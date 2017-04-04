(function() {
  'use strict';

  angular.module('home.items')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['ItemsListService'];
  function ItemsController(ItemsListService) {
    this.itemsService = ItemsListService;
    this.onSave = onSave;
    
    function onSave(itemName) {
      if (!itemName) return;
      this.itemsService.add(itemName);
    }
  }
})();
