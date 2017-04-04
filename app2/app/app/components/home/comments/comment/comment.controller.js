(function() {
  'use strict';

  angular.module('home.comments')
  .controller('CommentController', CommentController);

  function CommentController() {
    this.$onInit = $onInit;
    
    function $onInit() {
      this.commentText = this.comment;
    }
  }
})();

