import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);

    this._form = this._popup.querySelector('.forms');
    this._inputList = this._form.querySelectorAll('input');
    this._submitCallback = submitCallback;
    this._inputValuesList = this._getInputValues();
  }

  _getInputValues() {
    return Array
      .from(this._inputList)
      .map(input => input.value);
  }

  setEventListeners() {
    this._modalClose.addEventListener('click', () => this.close());

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._inputValuesList = this._getInputValues();

      this._submitCallback(this._inputValuesList);
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}