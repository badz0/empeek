import angular from 'angular';
import itemComponent from './item/item.component';
import itemsComponent from './items.component';
import itemInputComponent from './itemInput/itemInput.component';

let itemsModule = angular.module('items', [
])
.component('item', itemComponent)
.component('items', itemsComponent)
.component('itemInput', itemInputComponent)

.name;

export default itemsModule;
