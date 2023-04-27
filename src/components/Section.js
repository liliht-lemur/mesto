export class Section {
  constructor({ cardDetailsList, renderer }, containerSelector) {
    this._cardDetailsList = cardDetailsList;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderCards() {
      this._cardDetailsList.forEach((item) => {
        this._renderer(this.addItem.bind(this), item);
      });
  }

  addItem(newCard) {
    this._container.prepend(newCard);
  }
}