export class Card {
  constructor(title, link, templateSelector, handleCardClick) {
    this._title = title;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick.bind(this);

    this._newCard = this._getTemplate();
    this._cardTitle = this._newCard.querySelector('.element__title');
    this._cardImage = this._newCard.querySelector('.element__photo');
    this._likeButton = this._newCard.querySelector('.element__like');
    this._deleteButton = this._newCard.querySelector('.element__delete');
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  createCard() {
    this._cardTitle.textContent = this._title;
    this._cardImage.setAttribute('src', this._link);
    this._cardImage.setAttribute('alt', this._title);

    this._setEventListeners();

    return this._newCard;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._likeTheCard);
    this._deleteButton.addEventListener('click', this._handleDeleteButton);
    this._cardImage.addEventListener('click', this._handleCardClick);
  }

  _likeTheCard(event) {
    const button = event.target;
    button.classList.toggle('element__like_active');
  };

  _handleDeleteButton(event) {
    const button = event.target;
    const card = button.closest('.element');
    card.remove();
  };
}