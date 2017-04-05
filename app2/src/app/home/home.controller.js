(function() {
  'use strict';

  angular.module('app.home')
  .controller('HomeController', HomeController);

  HomeController.$inject = ['ItemsService'];
  
  function HomeController(ItemsService) {
    this.items = ItemsService;
    this.$onInit = $onInit;
    this.save = save;
    this.activateItem = activateItem;
    this.deleteItem = deleteItem;
    this.addComment = addComment;

    function $onInit() {
      this.itemName = '';
      this.comment = '';
    }

    function save() {
      if (!this.itemName) return;
      ItemsService.add(this.itemName);
      this.itemName = '';
    }

    function activateItem(id) {
      ItemsService.activate(id);
    }
    
    function deleteItem(id) {
      ItemsService.deleteItem(id);
    }

    function addComment(event) {
      if (event.keyCode === 13) {
        if (!this.comment) return;
        ItemsService.addComment(this.comment);
        this.comment = '';
      }
    }
  }
})();