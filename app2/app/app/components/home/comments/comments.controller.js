class CommentsController {
  constructor(ItemsListService) {
    'ngInject';
    this.itemsService = ItemsListService;
  }
  addComment(comment) {
    if (!comment) return;
    this.itemsService.addComment(comment);
  }
}

export default CommentsController;
