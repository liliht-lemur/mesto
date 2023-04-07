export class Section {
  constructor({ itemsList, renderer }, containerSelector) {
    this._renderedItems = itemsList;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderCards() {
    this._renderedItems.forEach((item) => {
      this._renderer(item, this._container);
    });
  }

  addItem(newCard) {
    this._container.prepend(newCard);
  }
}