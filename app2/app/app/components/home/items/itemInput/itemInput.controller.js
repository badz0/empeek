(function() {
  'use strict';

  angular.module('home.items')
  .controller('ItemInputController', ItemInputController);

  function ItemInputController() {
    this.$onInit = $onInit;
    this.save = save;
    
    function $onInit() {
      this.itemName = '';
    }

    function save() {
      this.onSave({
        itemName: this.itemName
      });
      this.itemName = '';
    }
  }
})();
