(function() {
  'use strict';

  angular.module('home.items')
  .controller('ItemController', ItemController);

  ItemController.$inject = ['ItemsListService'];
  function ItemController(ItemsListService) {
    this.itemsService = ItemsListService;
    this.activateItem = activateItem;
    this.deleteItem = deleteItem;

    function activateItem() {
      this.itemsService.activate(this.item.id);
    }
    
    function deleteItem() {
      this.itemsService.deleteItem(this.item.id);
    }
  }
})();
