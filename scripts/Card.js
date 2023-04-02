export class Card {
  constructor(title, link, templateSelector, modalWindowImg, addVisibilityModalWindow) {
    this._title = title;
    this._link = link;
    this._templateSelector = templateSelector;
    this._modalWindowImg = modalWindowImg;
    this._addVisibilityModalWindow = addVisibilityModalWindow;

    this._imageTitle = document.querySelector('.modal__title_img');
    this._imagePhoto = document.querySelector('.modal__photo');
  }

  _getTemplate() {
    const newCard = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return newCard;
  }

  createCard() {
    const newCard = this._getTemplate();
    const cardTitle = newCard.querySelector('.element__title');
  
    cardTitle.textContent =  this._title;
  
    const cardImage = newCard.querySelector('.element__photo');
  
    cardImage.setAttribute('src', this._link);
    cardImage.setAttribute('alt',  this._title);
  
    // Лайк карточки
    const likeButton = newCard.querySelector('.element__like');
    this._setEventListeners(likeButton, this._likeTheCard);
  
    // Удаление карточки
    const deleteButton = newCard.querySelector('.element__delete');
    this._setEventListeners(deleteButton, this._handleDeleteButton);

    this._setEventListeners(cardImage, (event)=> {
      this._handlerResizeCard(event)
    });

    return newCard;
  }

  _handlerResizeCard(event) {
    this._addVisibilityModalWindow(this._modalWindowImg);
    this._resizeCard(event.target);
  }

  _setEventListeners(target, handler) {
    target.addEventListener('click', handler);
  }

  _resizeCard(item) {
    this._imageTitle.textContent = this._title;
    this._imagePhoto.setAttribute('src', item.src);
    this._imagePhoto.setAttribute('alt', item.alt);
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