export default class ItemsList {
  
  constructor() {
    this.list = JSON.parse(localStorage.getItem('itemsData')) || [];
    this.deactivate();
    this.id = this.list.length ? this.list[this.list.length - 1].id : 1;
    this.activeIndex = '';
  }
  add(name) {
    this.id++;
    this.list.push(new Item(name, this.id));
    this.updateStorage();
  }
  activate(id) {
    let index;
    this.list.forEach( (item, i) => {
      item.active = false;
      if (item.id === id) {
        item.active = true;
        index = i;
      }
    });
    this.activeIndex = index + 1;
    this.updateStorage();
  }
  deactivate() {
    this.list.forEach( (item) => {
      item.active = false;
    });
  }
  delete(id){
    this.list = this.list.filter((item) => id !== item.id);
    this.activeIndex = '';
    this.updateStorage();
  }
  addComment(comment) {
    if (!this.activeIndex) return;
    this.list[this.activeIndex - 1].comments.push(comment);
    this.updateStorage();
  }
  updateStorage() {
    localStorage.setItem('itemsData', JSON.stringify(this.list));
  }
}

class Item {
  constructor(name, id) {
    this.id = id;
    this.name = name;
    this.comments = [];
    this.isActive = false;
  }
  get active() {
    return this.isActive;
  }
  set active(val) {
    this.isActive = !!val;
  }
}