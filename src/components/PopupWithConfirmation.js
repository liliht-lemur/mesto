import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitCallback, ) {
    super(popupSelector);
    this._form = this._popup.querySelector('.forms');
    this._submitCallback = submitCallback;
    this._buttonSubmitDelete = this._form.querySelector('.button_submit-delete');
    this._card = null;
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    this._modalClose.addEventListener('click', () => this.close());

    this._form.addEventListener('submit', async (event) => {
      event.preventDefault();

      this._buttonSubmitDelete.textContent = 'Удаление...';

      await this._submitCallback(this._card);

      this._buttonSubmitDelete.textContent = 'Да';

      this._card.remove();
      this.close();
    });
  }
}