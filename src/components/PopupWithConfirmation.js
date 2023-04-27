import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitCallback) {
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
    super.setEventListeners();

    this._form.addEventListener('submit', async (event) => {
      event.preventDefault();
      this._buttonSubmitDelete.textContent = 'Удаление...';

      const cardId = this._card.getId();

      this._submitCallback(cardId)
      .catch((e) => console.log(e))
      .finally(()=>{
        this._buttonSubmitDelete.textContent = 'Да';
        this._card.deleteCard();
        this.close();
      });;
    });
  }s
}