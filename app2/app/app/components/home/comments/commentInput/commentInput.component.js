(function() {
  'use strict';

  angular.module('home.comments')
  .component('commentInput', {
    templateUrl: 'app/components/home/comments/commentInput/commentInput.html',
    controller: 'CommentInputController',
    bindings: {
      add: '&'
    }
  });

})();