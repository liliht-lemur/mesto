import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);


    this._form = this._popup.querySelector('.forms');
    this._submitCallback = submitCallback;
  }

  _getInputValues () {}

  setEventListeners() {
    this._modalClose.addEventListener('click', (event) => {
      this.close();
      this._submitCallback(event);
    });
  }

  close() {
    super.close();
  }
}