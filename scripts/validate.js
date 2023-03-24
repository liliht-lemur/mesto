// block with validation

const showInputError = (formElem, inputElem, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElem.querySelector(`.${inputElem.id}-error`);

  inputElem.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElem, inputElem, inputErrorClass, errorClass) => {
  const errorElement = formElem.querySelector(`.${inputElem.id}-error`);

  inputElem.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, submitButton, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(inactiveButtonClass);
  } else {
    submitButton.classList.remove(inactiveButtonClass);
  }
};

const isValid = (formElem, inputElem, inputErrorClass, errorClass) => {
  if (!inputElem.validity.valid) {
    showInputError(formElem, inputElem, inputElem.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElem, inputElem, inputErrorClass, errorClass);
  }
};

const setEventListeners = (form, inputList, submitButton, config) => {
  const {inactiveButtonClass, inputErrorClass, errorClass} = config;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  inputList.forEach(inputElem => inputElem.addEventListener('input', ()=> {
    isValid (form, inputElem, inputErrorClass, errorClass);
    toggleButtonState(inputList, submitButton, inactiveButtonClass);
  }));

  toggleButtonState(inputList, submitButton, inactiveButtonClass);
};

const enableValidation = (configuration) => {
  const {formsSelector, inputSelector, submitButtonSelector, ...config} = configuration;
  const formList = document.querySelectorAll(formsSelector);

  formList.forEach(form => {
    const inputList = form.querySelectorAll(inputSelector);
    const submitButton = form.querySelector(submitButtonSelector);

    setEventListeners(form, inputList, submitButton, config);
  });
};

enableValidation({
  formsSelector: '.forms',
  inputSelector: '.modal__description',
  submitButtonSelector: '.button_submit',
  inactiveButtonClass: 'button_submit-disabled',
  inputErrorClass: 'modal__description_type_error',
  errorClass: 'modal__description-error_active'
});