(function() {
  'use strict';

  angular.module('home.comments')
  .component('comments', {
    templateUrl: 'app/components/home/comments/comments.html',
    controller: 'CommentsController',
      bindings: {
        activeIndex: '<'
      }
  });

})();