class ItemController {
  constructor(ItemsListService) {
    'ngInject';
    this.itemsService = ItemsListService;
  }
  activateItem() {
    this.itemsService.activate(this.item.id);
  }
  deleteItem() {
    this.itemsService.delete(this.item.id);
  }
}

export default ItemController;
