import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';
import Items from './items/items';
import Comments from './comments/comments';
import ItemsListService from'./itemsList.service';

let homeModule = angular.module('home', [
  uiRouter,
  Items,
  Comments
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'home'
    });
})
.component('home', homeComponent)
.service('ItemsListService', ItemsListService)

.name;

export default homeModule;
