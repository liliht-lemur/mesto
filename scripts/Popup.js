export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._modalClose = this._popup.querySelector('.modal__close');
  }

  open() {
    this._popup.classList.add('modal__overlay_active');
    document.addEventListener('keyup', (event) => {
      this._handleEscClose(event);
    });
    document.addEventListener('click', (event) => {
      this._closeByClickOutSideModalWindow(event);
    });

    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('modal__overlay_active');
    document.removeEventListener('keyup', (event) => {
      this._handleEscClose(event);
    });
    document.removeEventListener('click', (event) => {
      this._closeByClickOutSideModalWindow(event);
    });
  }

  setEventListeners() {
    this._modalClose.addEventListener('click', () => {
      this.close();
    });
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      const activeModalWindows = document.querySelector('.modal__overlay_active');

      if (activeModalWindows) {
        this.close();
      }
    }
  }

  _closeByClickOutSideModalWindow(event) {
    if (event.target.classList.contains('modal__overlay_active')) {
      this.close();
    }
  }
}