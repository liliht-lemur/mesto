export class Card {
  constructor(details, templateSelector, handleCardClick, handleDeleteCardButtonClick, handleLikeClick) {
    this._title = details.title;
    this._link = details.link;
    this._likes = details.likes;
    this._cardId = details.cardId;
    this._ownerId = details.ownerId;
    this._cardOwnerId = details.cardOwnerId;

    this._likesLength = this._likes.length;
    this._isILike = this._checkIsLiked();

    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick.bind(this);
    this._handleDeleteCardButtonClick = handleDeleteCardButtonClick;

    this._handleLikeAdd = handleLikeClick.add;
    this._handleLikeRemove = handleLikeClick.remove;

    this._newCard = this._getTemplate();
    this._cardTitle = this._newCard.querySelector('.element__title');
    this._cardImage = this._newCard.querySelector('.element__photo');
    this._buttonLike = this._newCard.querySelector('.element__like');
    this._counterLike = this._newCard.querySelector('.element__like-counter');
    this._buttonDelete = this._newCard.querySelector('.element__delete');

  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  getId() {
    return this._cardId;
  }

  createCard() {
    this._cardTitle.textContent = this._title;
    this._cardImage.setAttribute('src', this._link);
    this._cardImage.setAttribute('alt', this._title);
    this._counterLike.textContent = this._likesLength;

    if (this._isILike) {
      this._buttonLike.classList.add('element__like_active');
    }

    if (this._cardOwnerId !== this._ownerId) {
      this._buttonDelete.classList.add('element__delete_hidden');
    }

    this._setEventListeners();

    return this._newCard;
  }

  _checkIsLiked() {
    const withMyLike = this._likes.filter(person => person._id === this._ownerId);

    return Boolean(withMyLike.length);
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', (event) => {
      this._handleLikeClick(event);
    });
    this._buttonDelete.addEventListener('click', async () => {
      this._handleDeleteButton();
    });

    this._cardImage.addEventListener('click', this._handleCardClick);
  }

  async _handleLikeClick() {
    const { likes } = this._isILike
      ? await this._handleLikeRemove(this._cardId)
      : await this._handleLikeAdd(this._cardId);

    this._isILike
      ? this._buttonLike.classList.remove('element__like_active')
      : this._buttonLike.classList.add('element__like_active');

    this._likes = likes;
    this._likesLength = this._likes.length;
    this._isILike = this._checkIsLiked();
    this._counterLike.textContent = this._likesLength;


  };

  _handleDeleteButton() {
    this._handleDeleteCardButtonClick(this._newCard , this._cardId);
  };
}