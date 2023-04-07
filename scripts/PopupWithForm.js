import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);

    this._form = this._popup.querySelector('.forms');
    this._submitCallback = submitCallback;
    this._inputValuesList = this._getInputValues();
  }

  _getInputValues() {
    const inputList = this._form.querySelectorAll('input');

    return Array.from(inputList).map(input => input.value);
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
    this._form.reset();
    super.close();
  }
}