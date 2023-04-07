import { PopupWithImage } from "./PopupWithImage.js";

export class Card {
  constructor(title, link, templateSelector, modalWindowImgSelector) {
    this._title = title;
    this._link = link;
    this._templateSelector = templateSelector;

    this._popupWithImage = new PopupWithImage(modalWindowImgSelector); 
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
    const cardImage = newCard.querySelector('.element__photo');

    cardTitle.textContent =  this._title;
    cardImage.setAttribute('src', this._link);
    cardImage.setAttribute('alt',  this._title);
  
    this._setEventListeners(newCard, cardImage);

    return newCard;
  }

  _setEventListeners(newCard, cardImage) {
    const likeButton = newCard.querySelector('.element__like');
    const deleteButton = newCard.querySelector('.element__delete');

    likeButton.addEventListener('click', this._likeTheCard);
    deleteButton.addEventListener('click', this._handleDeleteButton);

    cardImage.addEventListener('click',(event)=> {
      this._popupWithImage.open(event.target);
    });
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