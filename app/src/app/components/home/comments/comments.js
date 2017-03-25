import angular from 'angular';
import commentComponent from './comment/comment.component';
import commentsComponent from './comments.component';
import commentInputComponent from './commentInput/commentInput.component';

let itemsModule = angular.module('comments', [
])
.component('comment', commentComponent)
.component('comments', commentsComponent)
.component('commentInput', commentInputComponent)

.name;

export default itemsModule;
