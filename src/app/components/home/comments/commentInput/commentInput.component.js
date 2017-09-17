import template from './commentInput.html';
import controller from './commentInput.controller';
import './commentInput.css';

let commentInputComponent = {
  template,
  controller,
  bindings: {
    add: '&'
  }
};

export default commentInputComponent;
