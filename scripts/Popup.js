export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

  }

  open() {
    this._popup.classList.add('modal__overlay_active');
    document.addEventListener('keyup', (event) => {
      this._handleEscClose(event);
    });
    document.addEventListener('click', (event) => {
      this._closeByClickOutSideModalWindow(event);
    });
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

  addClickEvent(iconByClosePopup) {
    iconByClosePopup.addEventListener('click', close);
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


  // toggleVisibilityModalWindow(modalWindow, isNeedOpen = true) {
  //   isNeedOpen 
  //   ? this._addVisibilityModalWindow(modalWindow) : this._removeVisibilityModalWindow(modalWindow);
  // }



  // _addVisibilityModalWindow(modalWindow) {
  //   modalWindow.classList.add('modal__overlay_active');
  //   document.addEventListener('keyup', (event) => {
  //     this._closeByEscape(event);
  //   });
  //   document.addEventListener('click', (event) => {
  //     this._closeByClickOutSideModalWindow(event);
  //   });
  // }

  // _removeVisibilityModalWindow(modalWindow) {
  //   modalWindow.classList.remove('modal__overlay_active');
  //   document.removeEventListener('keyup', (event) => {
  //     this._closeByEscape(event);
  //   });
  //   document.removeEventListener('click', (event) => {
  //     this._closeByClickOutSideModalWindow(event);
  //   });
  // }


}