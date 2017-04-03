(function() {
  'use strict';

  angular.module('app.home')
  .service('ItemsListService', ItemsList);
  
  function ItemsList() {
    var that = this;

    this.list = JSON.parse(localStorage.getItem('itemsData')) || [];
    deactivate();
    this.id = this.list.length ? this.list[this.list.length - 1].id : 1;
    this.activeIndex = '';

    this.add = function (name) {
      this.id++;
      this.list.push(new Item(name, this.id));
      this.updateStorage();
    }
    this.activate = function(id) {
      var index;
      this.list.forEach( (item, i) => {
        item.active = false;
        if (item.id === id) {
          item.active = true;
          index = i;
        }
      });
      this.activeIndex = index + 1;
      this.updateStorage();
    }
    function deactivate() {
      that.list.forEach( (item) => {
        item.active = false;
      });
    }
    this.delete = function(id) {
      this.list = this.list.filter((item, i) => {
        if (id === item.id) {
          if (i < this.activeIndex) this.activeIndex--;
          if (item.active) this.activeIndex = '';
          return false;
        }
        return true;
      });
      this.updateStorage();
    }
    this.addComment = function(comment) {
      if (!this.activeIndex) return;
      this.list[this.activeIndex - 1].comments.push(comment);
      this.updateStorage();
    }
    this.updateStorage = function() {
      localStorage.setItem('itemsData', JSON.stringify(this.list));
    }
  }

  function Item(name, id) {
    this.id = id;
    this.name = name;
    this.comments = [];
    this.active = false;
  }
})();