export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._modalClose = this._popup.querySelector('.modal__close');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeByClickOutSideModalWindow = this._closeByClickOutSideModalWindow.bind(this);
  }

  open() {
    this._popup.classList.add('modal__overlay_active');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('modal__overlay_active');

    document.removeEventListener('keyup', this._handleEscClose);
  }

  setEventListeners() {
    this._modalClose.addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('click', this._closeByClickOutSideModalWindow);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _closeByClickOutSideModalWindow(event) {
    if (event.target.classList.contains('modal__overlay_active')) {
      this.close();
    }
  }
}