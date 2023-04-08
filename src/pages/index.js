import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';

import { initialCardsDetails } from '../utils/constants.js';
import './index.css';

(() => {
  const formList = document.querySelectorAll('.forms');

  const formValidatorsList = Array.from(formList).map(form => {
    const formValidator = createFormValidator(form);
    formValidator.enableValidation();
    return formValidator;
  });

  const elementsSectionSelector = '.elements';
  const modalWindowImgSelector = '.modal__overlay_img';
  const modalWindowAddNewCardSelector = '.modal__overlay_add';
  const modalWindowProfileSelector = '.modal__overlay_profile';
  const userNameSelector = '.profile__title';
  const userInfoSelector = '.profile__subtitle';

  // Create classes section
  const popupWithImage = new PopupWithImage(modalWindowImgSelector);
  const cardCreatePopup = new PopupWithForm(modalWindowAddNewCardSelector, handleFormAddSubmit);
  const profileEditPopup = new PopupWithForm(modalWindowProfileSelector, handleFormProfileSubmit);
  const userCard = new UserInfo({ userNameSelector, userInfoSelector });

  const section = new Section({
    cardDetailsList: initialCardsDetails,
    renderer: (cardDetails, pointMount) => {
      const { name, link } = cardDetails;
      const newCard = createCard(name, link);
      renderCard(newCard, pointMount);
    }
  }, elementsSectionSelector);

  popupWithImage.setEventListeners();
  cardCreatePopup.setEventListeners();
  profileEditPopup.setEventListeners();
  section.renderCards();

  // Изменение профиля 


  const userNameInput = '.modal__description_type_name';
  const userInfoInput = '.modal__description_type_about-self';

  const modalWindowProfile = document.querySelector('.modal__overlay');
  const profile = document.querySelector('.profile');
  const editButton = profile.querySelector('.button_edit');
  const inputNameFormProfile = modalWindowProfile.querySelector(userNameInput);
  const inputAboutSelfFormProfile = modalWindowProfile.querySelector(userInfoInput);

  editButton.addEventListener('click', function () {
    const { userName, userInfo } = userCard.getUserInfo();

    inputNameFormProfile.value = userName;
    inputAboutSelfFormProfile.value = userInfo;

    profileEditPopup.open();
  });

  // Форма добавления карточки

  const formAddNewCardSelector = '.modal__add';

  const addButton = document.querySelector('.button_add');
  const formAddNewCard = document.querySelector(formAddNewCardSelector);
  const addNewCardButtonSubmit = formAddNewCard.querySelector('.button_submit');

  addButton.addEventListener('click', () => {
    cardCreatePopup.open();
  })

  // functions block

  function handleFormProfileSubmit(inputValuesList) {
    const [name, info] = inputValuesList;
    userCard.setUserInfo(name, info);
  }

  function createCard(name, link) {
    const card = new Card(name, link, '#cardTemplate', handleCardClick);
    return card.createCard();
  }

  function renderCard(newCard, pointMount) {
    pointMount.append(newCard);
  }

  function handleCardClick(event) {
    popupWithImage.open(event.target);
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

  function handleFormAddSubmit(inputValuesList) {
    const [name, link] = inputValuesList;
    const newCard = createCard(name, link);

    section.addItem(newCard);

    formValidatorsList[1].disableSubmitButton(addNewCardButtonSubmit);
  }

})();

