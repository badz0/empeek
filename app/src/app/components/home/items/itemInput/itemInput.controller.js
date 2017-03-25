class ItemInputController {
  $onInit() {
    this.itemName = '';
  }
  save() {
    this.onSave({
      itemName: this.itemName
    });
    this.itemName = '';
  }
}

export default ItemInputController;
