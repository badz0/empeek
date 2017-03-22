import angular from 'angular';
import Home from './home/home';
import Navbar from './navbar/navbar';

let componentModule = angular.module('app.components', [
  Home,
  Navbar
])

.name;

export default componentModule;
