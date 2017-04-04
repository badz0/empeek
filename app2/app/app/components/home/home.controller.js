(function() {
  'use strict';

  angular.module('app.home')
  .controller('HomeController', HomeController);

  HomeController.$inject = ['ItemsListService'];
  
  function HomeController(ItemsListService) {
    this.itemsService = ItemsListService;
  }
})();