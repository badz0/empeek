class HomeController {
  constructor(ItemsListService) {
    'ngInject';
    this.itemsService = ItemsListService;
  }
}

export default HomeController;
