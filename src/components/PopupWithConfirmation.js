import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._form = this._popup.querySelector('.forms');
    this._submitCallback = submitCallback;
    this._card = null;
    this._buttonSubmit = this._form.querySelector('.button_submit');
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setButtonText(text) {
    this._buttonSubmit.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitCallback(this._card);
    });
  }
}