(function() {
  'use strict';

  angular.module('home.items')
  .controller('ItemController', ItemController);

  ItemController.$inject = ['ItemsListService'];
  function ItemController(ItemsListService) {
    this.itemsService = ItemsListService;

    this.activateItem = function() {
      this.itemsService.activate(this.item.id);
    }
    this.deleteItem = function() {
      this.itemsService.delete(this.item.id);
    }
  }
})();
