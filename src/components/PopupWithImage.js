import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageTitle = document.querySelector('.modal__title_img');
    this._imagePhoto = document.querySelector('.modal__photo');
  }

  open(item) {
    super.open();
    this._resizeCard(item);
  }

  _resizeCard(item) {
    this._imageTitle.textContent = item.alt;
    this._imagePhoto.setAttribute('src', item.src);
    this._imagePhoto.setAttribute('alt', item.alt);
  }
}