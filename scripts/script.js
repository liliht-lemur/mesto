import { FormValidator } from './FormValidator.js'
import { Card } from './Card.js'

(() => {
  const formList = document.querySelectorAll('.forms');

  formList.forEach(form => {
    const formValidator = new FormValidator({
      inputSelector: '.modal__description',
      submitButtonSelector: '.button_submit',
      inactiveButtonClass: 'button_submit-disabled',
      inputErrorClass: 'modal__description_type_error',
      errorClass: 'modal__description-error_active'
    }, form
    );
    formValidator.enableValidation();
  });


  const initialCardsDetails = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  const modalWindowImg = document.querySelector('.modal__overlay_img');
  const modalCloseImg = modalWindowImg.querySelector('.modal__close_img');

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

  initialCardsDetails.forEach(cardDetails => {
    const { name, link } = cardDetails;
    const card = new Card(name, link, '#cardTemplate', modalWindowImg, toggleVisibilityModalWindow);
    card.renderCard();
  });




  // Изменение профиля 

  editButton.addEventListener('click', function () {
    toggleVisibilityModalWindow(modalWindowProfile);

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
      toggleVisibilityModalWindow(event.target, false);
    }
  }
  
  function closeByEscape(event) {
    if (event.key === 'Escape') {
      const activeModalWindows = document.querySelector('.modal__overlay_active');
  
      if (activeModalWindows) {
        toggleVisibilityModalWindow(activeModalWindows, false);
      }
    }
  }
  
  function toggleVisibilityModalWindow(modalWindow, isNeedOpen = true) {
    isNeedOpen 
    ? addVisibilityModalWindow(modalWindow) : removeVisibilityModalWindow(modalWindow);
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
      toggleVisibilityModalWindow(item, isAddEvent);
    });
  }


  function handleFormAddSubmit(evt) {
    evt.preventDefault();

    const name = inputNameFormAddNewCard.value;
    const link = inputLinkFormAddNewCard.value;
    const card = new Card(name, link, '#cardTemplate', modalWindowImg, modalWindowAction);

    card.renderCard(false);
    toggleVisibilityModalWindow(modalWindowAddNewCard, false);

    addNewCardButtonSubmit.setAttribute('disabled', true);
    addNewCardButtonSubmit.classList.add('button_submit-disabled');
    evt.target.reset()
  }

  function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    myName.textContent = inputNameFormProfile.value;
    aboutSelf.textContent = inputAboutSelfFormProfile.value;
    toggleVisibilityModalWindow(modalWindowProfile, false);
  }
})();