export class FormValidator {
  constructor(options, form, removeVisibilityModalWindow) {
    this._form = form;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;

    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._removeVisibilityModalWindow = removeVisibilityModalWindow;

    this._inputList = this._form.querySelectorAll(this._inputSelector);
    this._buttonSubmit = this._form.querySelector(this._submitButtonSelector)
  }

  disableSubmitButton() {
    console.log('1'.repeat(20))
    this._buttonSubmit.setAttribute('disabled', true);
    this._buttonSubmit.classList.add(this._inactiveButtonClass);
  }

  _showInputError(inputElem, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElem.id}-error`);

    inputElem.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };

  _hideInputError(inputElem) {
    const errorElement = this._form.querySelector(`.${inputElem.id}-error`);

    inputElem.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput() {
    return Array.from(this._inputList).some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonSubmit.classList.add(this._inactiveButtonClass);
      this._buttonSubmit.setAttribute('disabled', true);
    } else {
      this._buttonSubmit.classList.remove(this._inactiveButtonClass);
      this._buttonSubmit.removeAttribute('disabled');
    }
  };

  _isValid(inputElem) {
    if (!inputElem.validity.valid) {
      this._showInputError(inputElem, inputElem.validationMessage);
    } else {
      this._hideInputError(inputElem);
    }
  };

  _setEventListeners() {
    this._inputList.forEach(inputElem => inputElem.addEventListener('input', () => {
      this._isValid(inputElem);
      this._toggleButtonState();
    }));

    this._toggleButtonState();
  };

  enableValidation() {
    this._setEventListeners();
  };
}

