(function() {
  'use strict';

  angular.module('home.items')
  .controller('ItemInputController', ItemInputController);

  function ItemInputController() {
    this.$onInit = function() {
      this.itemName = '';
    }
    this.save = function() {
      this.onSave({
        itemName: this.itemName
      });
      this.itemName = '';
    }
  }
})();
