export class Section {
  constructor({ cardDetailsList, renderer }, containerSelector) {
    this._cardDetailsList = cardDetailsList;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderCards() {
    // if (typeof this._cardDetailsList === 'array') {
      this._cardDetailsList.forEach((item) => {
        this._renderer(item, this._container);
      });
    // }
  }

  addItem(newCard) {
    this._container.prepend(newCard);
  }
}

[].length