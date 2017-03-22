import angular from 'angular';
import itemComponent from './item/item.component';
import itemsComponent from './items.component';

let itemsModule = angular.module('items', [
])
.component('item', itemComponent)
.component('items', itemsComponent)

.name;

export default itemsModule;
