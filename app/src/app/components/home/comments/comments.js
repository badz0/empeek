import angular from 'angular';
import commentComponent from './comment/comment.component';
import commentsComponent from './comments.component';

let itemsModule = angular.module('comments', [
])
.component('comment', commentComponent)
.component('comments', commentsComponent)

.name;

export default itemsModule;
