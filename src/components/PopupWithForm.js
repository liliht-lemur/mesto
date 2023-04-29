import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);

    this._form = this._popup.querySelector('.forms');
    this._inputList = this._form.querySelectorAll('input');
    this._submitCallback = submitCallback;

    this._buttonSubmit = this._form.querySelector('.button_submit');
    this._buttonSubmitText = this._buttonSubmit.textContent;
  }

  getInputValues() {
    return Array
      .from(this._inputList)
      .map(input => input.value);
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitCallback(this);
    });
  }

  setButtonText(text) {
    this._buttonSubmit.textContent = text;
  }

  close() {
    this._buttonSubmit.textContent = this._buttonSubmitText;
    super.close();
    this._form.reset();
  }
}