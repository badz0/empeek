(function() {
  'use strict';

  angular.module('home.comments')
  .controller('CommentInputController', CommentInputController);

  function CommentInputController() {
    this.$onInit = $onInit;
    this.addComment = addComment;

    function $onInit() {
      this.comment = '';
    }
    
    function addComment(event) {
      if (event.keyCode === 13) {
        this.add({ comment: this.comment });
        this.comment = '';
      }
    }
  }
})();
