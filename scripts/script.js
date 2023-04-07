import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { Section } from './Section.js';
import { initialCardsDetails } from './constants.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';

(() => {
  const formList = document.querySelectorAll('.forms');

  const formValidatorsList = Array.from(formList).map(form => {
    const formValidator = createFormValidator(form);
    formValidator.enableValidation();
    return formValidator;
  });

  const elementsSectionSelector = '.elements';
  const modalWindowImgSelector = '.modal__overlay_img';

  const section = new Section({
    cardDetailsList: initialCardsDetails,
    renderer: (cardDetails, pointMount) => {
      const { name, link } = cardDetails;
      const newCard = createCard(name, link);
      renderCard(newCard, pointMount);
    }
  }, elementsSectionSelector);

  section.renderCards();

  // functions block

  function createCard(name, link) {
    const card = new Card(name, link, '#cardTemplate', modalWindowImgSelector);
    return card.createCard();
  }

  function renderCard(newCard, pointMount) {
    pointMount.append(newCard);
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



  // ----------------------------------------------------------------------------------------------------

    // Изменение профиля 
    const modalWindowProfileSelector = '.modal__overlay_profile';
    const userNameSelector = '.profile__title';
    const userInfoSelector = '.profile__subtitle';
    const userNameInput = '.modal__description_type_name';
    const userInfoInput = '.modal__description_type_about-self';
    const modalWindowProfile = document.querySelector('.modal__overlay');
    const profile = document.querySelector('.profile');
    const editButton = profile.querySelector('.button_edit');





    editButton.addEventListener('click', function () {
      const userCard = new UserInfo({userNameSelector, userInfoSelector});

      const { userName, userInfo } = userCard.getUserInfo();

      const inputNameFormProfile = modalWindowProfile.querySelector(userNameInput);
      const inputAboutSelfFormProfile = modalWindowProfile.querySelector(userInfoInput);

      inputNameFormProfile.value = userName;
      inputAboutSelfFormProfile.value = userInfo;


      const handleFormProfileSubmit = (evt) => {
        evt.preventDefault();
        myName.textContent = inputNameFormProfile.value;
        aboutSelf.textContent = inputAboutSelfFormProfile.value;
    
        userCard.setUserInfo(userName, userInfo);
      }

      

      const profileEditPopup = new PopupWithForm(modalWindowProfileSelector, handleFormProfileSubmit);
      profileEditPopup.open();
    });



















 


  // initialCardsDetails.forEach(cardDetails => {
  //   const { name, link } = cardDetails;
  //   const newCard = createCard(name, link);

  //   renderCard(newCard);
  // });



  // Изменение профиля 

  // editButton.addEventListener('click', function () {
  //   addVisibilityModalWindow(modalWindowProfile);

  //   inputNameFormProfile.value = myName.textContent;
  //   inputAboutSelfFormProfile.value = aboutSelf.textContent;
  // });

  // addClickEvent(buttonCloseModalWindowProfile, modalWindowProfile, false);

  // formProfile.addEventListener('submit', handleFormProfileSubmit);

  // Форма добавления карточки

  const modalWindowAddNewCard = document.querySelector('.modal__overlay_add');
  const buttonCloseModalWindowAddNewCard = modalWindowAddNewCard.querySelector('.modal__close_add');

  // addClickEvent(addButton, modalWindowAddNewCard);
  // addClickEvent(buttonCloseModalWindowAddNewCard, modalWindowAddNewCard, false);

  // close image modal window
  const formAddNewCard = document.querySelector('.modal__add');
  const inputNameFormAddNewCard = formAddNewCard.querySelector('.modal__description_type_heading');
  const inputLinkFormAddNewCard = formAddNewCard.querySelector('.modal__description_type_link');
  const addNewCardButtonSubmit = formAddNewCard.querySelector('.button_submit');

  formAddNewCard.addEventListener('submit', handleFormAddSubmit);
  
  
  // addClickEvent(modalCloseImg, modalWindowImg, false);

  // block with functions
  // function closeByClickOutSideModalWindow(event) {
  //   if (event.target.classList.contains('modal__overlay_active')) {
  //     removeVisibilityModalWindow(event.target);
  //   }
  // }



  // function closeByEscape(event) {
  //   if (event.key === 'Escape') {
  //     const activeModalWindows = document.querySelector('.modal__overlay_active');

  //     if (activeModalWindows) {
  //       removeVisibilityModalWindow(activeModalWindows);
  //     }
  //   }
  // }

  // function addVisibilityModalWindow(modalWindow) {
  //   modalWindow.classList.add('modal__overlay_active');
  //   document.addEventListener('keyup', closeByEscape);
  //   document.addEventListener('click', closeByClickOutSideModalWindow);
  // }

  // function removeVisibilityModalWindow(modalWindow) {
  //   modalWindow.classList.remove('modal__overlay_active');
  //   document.removeEventListener('keyup', closeByEscape);
  //   document.removeEventListener('click', closeByClickOutSideModalWindow);
  // }

  // function addClickEvent(target, item, isAddEvent = true) {
  //   target.addEventListener('click', function () {
  //     isAddEvent ? addVisibilityModalWindow(item) : removeVisibilityModalWindow(item);
  //   });
  // }
  



  function handleFormAddSubmit(evt) {
    evt.preventDefault();

    const name = inputNameFormAddNewCard.value;
    const link = inputLinkFormAddNewCard.value;
    const newCard = createCard(name, link);

    section.addItem(newCard);

    formValidatorsList[1].disableSubmitButton(addNewCardButtonSubmit);
    evt.target.reset()
  }




})();