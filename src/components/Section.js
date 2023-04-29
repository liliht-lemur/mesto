export class Section {
  constructor({ cardDetailsList, renderer }, containerSelector) {
    this._cardDetailsList = cardDetailsList;
    this._renderer = renderer.bind(this);
    this._container = document.querySelector(containerSelector);
  }

  renderCards() {
      this._cardDetailsList.forEach((item) => {
        this._renderer(item);
      });
  }

  addItem(newCard) {
    this._container.prepend(newCard);
  }
}