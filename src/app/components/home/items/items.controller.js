class ItemsController {
  constructor(ItemsListService) {
    'ngInject';
    this.itemsService = ItemsListService;
  }
  onSave(itemName) {
    if (!itemName) return;
    this.itemsService.add(itemName);
  }
}

export default ItemsController;
