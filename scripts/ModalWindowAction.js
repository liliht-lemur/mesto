export class ModalWindowAction{
  toggleVisibilityModalWindow(modalWindow, isNeedOpen = true) {
    isNeedOpen 
    ? this._addVisibilityModalWindow(modalWindow) : this._removeVisibilityModalWindow(modalWindow);
  }

  _closeByClickOutSideModalWindow(event) {
    if (event.target.classList.contains('modal__overlay_active')) {
      this.toggleVisibilityModalWindow(event.target, false);
    }
  }
  
  _closeByEscape(event) {
    if (event.key === 'Escape') {
      const activeModalWindows = document.querySelector('.modal__overlay_active');
  
      if (activeModalWindows) {
        this.toggleVisibilityModalWindow(activeModalWindows, false);
      }
    }
  }
  
  
  _addVisibilityModalWindow(modalWindow) {
    modalWindow.classList.add('modal__overlay_active');
    document.addEventListener('keyup', (event) => {
      this._closeByEscape(event);
    });
    document.addEventListener('click', (event) => {
      this._closeByClickOutSideModalWindow(event);
    });
  }
  
  _removeVisibilityModalWindow(modalWindow) {
    modalWindow.classList.remove('modal__overlay_active');
    document.removeEventListener('keyup', (event) => {
      this._closeByEscape(event);
    });
    document.removeEventListener('click', (event) => {
      this._closeByClickOutSideModalWindow(event);
    });
  }
  
  addClickEvent(target, item, isAddEvent = true) {
    target.addEventListener('click', (event) => {
      this.toggleVisibilityModalWindow(item, isAddEvent);
    });
  }
}