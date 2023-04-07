import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { Section } from './Section.js';
import { initialCardsDetails } from './constants.js';

(() => {
  const formList = document.querySelectorAll('.forms');

  const formValidatorsList = Array.from(formList).map(form => {
    const formValidator = createFormValidator(form);
    formValidator.enableValidation();
    return formValidator;
  });

  const elementsSectionSelector = '.elements';
  const modalWindowImg = document.querySelector('.modal__overlay_img');
  const modalCloseImg = modalWindowImg.querySelector('.modal__close_img');

  const section = new Section({
    itemsList: initialCardsDetails, 
    renderer: (cardDetails, pointMount) => {
      const { name, link } = cardDetails;
      const newCard = createCard(name, link);
      renderCard(newCard, pointMount);
    }
  }, elementsSectionSelector);

  section.renderCards();

  // functions block

  function createCard(name, link) {
    const card = new Card(name, link, '#cardTemplate', modalWindowImg, addVisibilityModalWindow);
    return card.createCard();
  }

  function renderCard(newCard, pointMount) {
    pointMount.append(newCard);
  }


















  const modalWindowProfile = document.querySelector('.modal__overlay');
  const buttonCloseModalWindowProfile = modalWindowProfile.querySelector('.modal__close');
  const inputNameFormProfile = modalWindowProfile.querySelector('.modal__description_type_name');
  const inputAboutSelfFormProfile = modalWindowProfile.querySelector('.modal__description_type_about-self');
  const formProfile = modalWindowProfile.querySelector('.modal__edit');

  const profile = document.querySelector('.profile');
  const myName = profile.querySelector('.profile__title');
  const aboutSelf = profile.querySelector('.profile__subtitle');
  const editButton = profile.querySelector('.button_edit');
  const addButton = profile.querySelector('.button_add');


  // initialCardsDetails.forEach(cardDetails => {
  //   const { name, link } = cardDetails;
  //   const newCard = createCard(name, link);
    
  //   renderCard(newCard);
  // });



  // Изменение профиля 

  editButton.addEventListener('click', function () {
    addVisibilityModalWindow(modalWindowProfile);

    inputNameFormProfile.value = myName.textContent;
    inputAboutSelfFormProfile.value = aboutSelf.textContent;
  });

  addClickEvent(buttonCloseModalWindowProfile, modalWindowProfile, false);

  formProfile.addEventListener('submit', handleFormProfileSubmit);

  // Форма добавления карточки

  const modalWindowAddNewCard = document.querySelector('.modal__overlay_add');
  const buttonCloseModalWindowAddNewCard = modalWindowAddNewCard.querySelector('.modal__close_add');

  addClickEvent(addButton, modalWindowAddNewCard);
  addClickEvent(buttonCloseModalWindowAddNewCard, modalWindowAddNewCard, false);

  // close image modal window
  const formAddNewCard = document.querySelector('.modal__add');
  const inputNameFormAddNewCard = formAddNewCard.querySelector('.modal__description_type_heading');
  const inputLinkFormAddNewCard = formAddNewCard.querySelector('.modal__description_type_link');
  const addNewCardButtonSubmit = formAddNewCard.querySelector('.button_submit');

  formAddNewCard.addEventListener('submit', handleFormAddSubmit);
  addClickEvent(modalCloseImg, modalWindowImg, false);

  // block with functions
  function closeByClickOutSideModalWindow(event) {
    if (event.target.classList.contains('modal__overlay_active')) {
      removeVisibilityModalWindow(event.target);
    }
  }

  function createFormValidator(form) {
    return new FormValidator({
      inputSelector: '.modal__description',
      submitButtonSelector: '.button_submit',
      inactiveButtonClass: 'button_submit-disabled',
      inputErrorClass: 'modal__description_type_error',
      errorClass: 'modal__description-error_active'
    }, form
    );
  }



  function closeByEscape(event) {
    if (event.key === 'Escape') {
      const activeModalWindows = document.querySelector('.modal__overlay_active');

      if (activeModalWindows) {
        removeVisibilityModalWindow(activeModalWindows);
      }
    }
  }

  function addVisibilityModalWindow(modalWindow) {
    modalWindow.classList.add('modal__overlay_active');
    document.addEventListener('keyup', closeByEscape);
    document.addEventListener('click', closeByClickOutSideModalWindow);
  }

  function removeVisibilityModalWindow(modalWindow) {
    modalWindow.classList.remove('modal__overlay_active');
    document.removeEventListener('keyup', closeByEscape);
    document.removeEventListener('click', closeByClickOutSideModalWindow);
  }

  function addClickEvent(target, item, isAddEvent = true) {
    target.addEventListener('click', function () {
      isAddEvent ? addVisibilityModalWindow(item) : removeVisibilityModalWindow(item);
    });
  }

  function handleFormAddSubmit(evt) {
    evt.preventDefault();

    const name = inputNameFormAddNewCard.value;
    const link = inputLinkFormAddNewCard.value;
    const newCard = createCard(name, link);
    
    renderCard(newCard, false);
    removeVisibilityModalWindow(modalWindowAddNewCard);

    formValidatorsList[1].disableSubmitButton(addNewCardButtonSubmit);
    evt.target.reset()
  }

  function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    myName.textContent = inputNameFormProfile.value;
    aboutSelf.textContent = inputAboutSelfFormProfile.value;
    removeVisibilityModalWindow(modalWindowProfile);
  }


})();