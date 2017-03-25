class CommentInputController {
  $onInit() {
    this.comment = '';
  }
  addComment(event) {
    if (event.keyCode === 13) {
      this.add({ comment: this.comment });
      this.comment = '';
    }
  }
}

export default CommentInputController;
