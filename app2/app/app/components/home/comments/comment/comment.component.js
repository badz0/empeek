import template from './comment.html';
import controller from './comment.controller';
import './comment.css';

let commentComponent = {
  template,
  controller,
  bindings: {
    comment: '<'
  }
};

export default commentComponent;
