export class Card {
  constructor(details, templateSelector, handleCardClick, handleDeleteCardButtonClick, handleLikeClick) {
    this._title = details.title;
    this._link = details.link;
    this._likes = details.likes;
    this._cardId = details.cardId;
    this._ownerId = details.ownerId;
    this._cardOwnerId = details.cardOwnerId;

    this._likesLength = this._likes.length;
    this._isILike = this._handleLikesInfo();

    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick.bind(this);
    this._handleDeleteCardButtonClick = handleDeleteCardButtonClick;

    this._handleLikeAdd = handleLikeClick.add;
    this._handleLikeRemove = handleLikeClick.remove;

    this._newCard = this._getTemplate();
    this._cardTitle = this._newCard.querySelector('.element__title');
    this._cardImage = this._newCard.querySelector('.element__photo');
    this._likeButton = this._newCard.querySelector('.element__like');
    this._likeCounter = this._newCard.querySelector('.element__like-counter');
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
    this._newCard.setAttribute('card_id', this._cardId);
    this._cardTitle.textContent = this._title;
    this._cardImage.setAttribute('src', this._link);
    this._cardImage.setAttribute('alt', this._title);
    this._likeCounter.textContent = this._likesLength;

    if (this._isILike) {
      this._likeButton.classList.add('element__like_active');
    }

    if (this._cardOwnerId !== this._ownerId) {
      this._deleteButton.classList.add('element__delete_hidden');
    }

    this._setEventListeners();

    return this._newCard;
  }

  _handleLikesInfo() {
    const withMyLike = this._likes.filter(person => person._id === this._ownerId);

    return Boolean(withMyLike.length);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', (event) => {
      this._likeTheCard(event);
    });
    this._deleteButton.addEventListener('click', async (event)=> {
      await this._handleDeleteButton(event.target);
    });

    this._cardImage.addEventListener('click', this._handleCardClick);
  }

  async _likeTheCard(event) {
    const button = event.target;

    const { likes } = this._isILike
      ? await this._handleLikeRemove(this._cardId)
      : await this._handleLikeAdd(this._cardId);

    this._likes = likes;
    this._likesLength = this._likes.length;
    this._isILike = this._handleLikesInfo();
    this._likeCounter.textContent = this._likesLength;


    button.classList.toggle('element__like_active');
  };

  async _handleDeleteButton(button) {
    const card = button.closest('.element');

    await this._handleDeleteCardButtonClick(card);
  };
}