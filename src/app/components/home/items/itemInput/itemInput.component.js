import template from './itemInput.html';
import controller from './itemInput.controller';
import './itemInput.css';

let itemInputComponent = {
  template,
  controller,
  bindings: {
    onSave: '&'
  }
};

export default itemInputComponent;
