import template from './comments.html';
import controller from './comments.controller';
import './comments.css';

let commentsComponent = {
  template,
  controller,
  bindings: {
    activeIndex: '<'
  }
};

export default commentsComponent;
