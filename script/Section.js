class Section {
  constructor({items, renderer}, containerSelector) {
    this,_itemsRender = items
    this._renderer = renderer
    this._containerSelector = document.querySelector(containerSelector)
  };

  addItem(elementItem) {
    this._itemsRender.append(elementItem);
  }

  renderItems() {
    _itemsRender.forEach((item) => {
      this._renderer(item);
    });
  }
}
