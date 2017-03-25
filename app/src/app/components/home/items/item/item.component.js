import template from './item.html';
import controller from './item.controller';
import './item.css';

let itemComponent = {
  template,
  controller,
  bindings: {
    item: '<',
    numOfComments: '<'
  }
};

export default itemComponent;
