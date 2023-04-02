export class FormValidator {
  constructor(options, form) {
    this._form = form;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
  }
  //_showInputError (formElem, inputElem, errorMessage, inputErrorClass, errorClass) {
  _showInputError(inputElem, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElem.id}-error`);

    inputElem.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };
  // _hideInputError (formElem, inputElem, inputErrorClass, errorClass) {
  _hideInputError(inputElem) {
    const errorElement = this._form.querySelector(`.${inputElem.id}-error`);

    inputElem.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _hasInvalidInput(inputList) {
    return Array.from(inputList).some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState(inputList, submitButton) {
    if (this._hasInvalidInput(inputList)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.setAttribute('disabled', true);
    } else {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.removeAttribute('disabled');
    }
  };

  _isValid(inputElem) {
    if (!inputElem.validity.valid) {
      this._showInputError(inputElem, inputElem.validationMessage);
    } else {
      this._hideInputError(inputElem);
    }
  };

  _setEventListeners(inputList, submitButton) {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    inputList.forEach(inputElem => inputElem.addEventListener('input', () => {
      this._isValid(inputElem);
      this._toggleButtonState(inputList, submitButton);
    }));

    this._toggleButtonState(inputList, submitButton);
  };

  enableValidation() {
    const inputList = this._form.querySelectorAll(this._inputSelector);
    const submitButton = this._form.querySelector(this._submitButtonSelector);

    this._setEventListeners(inputList, submitButton);
  };
}

