(function() {
  'use strict';

  angular.module('home.comments')
  .component('comment', {
    templateUrl: 'app/components/home/comments/comment/comment.html',
    controller: 'CommentController',
    bindings: {
      comment: '<'
    }
  });

})();