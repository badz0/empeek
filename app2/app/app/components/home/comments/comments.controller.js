(function() {
  'use strict';

  angular.module('home.comments')
  .controller('CommentsController', CommentsController);

  CommentsController.$inject = ['ItemsListService'];
  function CommentsController(ItemsListService) {
    this.itemsService = ItemsListService;
    this.addComment = addComment;
    
    function addComment(comment) {
      if (!comment) return;
      this.itemsService.addComment(comment);
    }
  }
})();