import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { Section } from './Section.js';
import { initialCardsDetails } from './constants.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import { PopupWithImage } from './PopupWithImage.js';

(() => {
  const formList = document.querySelectorAll('.forms');

  const formValidatorsList = Array.from(formList).map(form => {
    const formValidator = createFormValidator(form);
    formValidator.enableValidation();
    return formValidator;
  });

  const elementsSectionSelector = '.elements';
  const modalWindowImgSelector = '.modal__overlay_img';


  const popupWithImage = new PopupWithImage(modalWindowImgSelector);
  const section = new Section({
    cardDetailsList: initialCardsDetails,
    renderer: (cardDetails, pointMount) => {
      const { name, link } = cardDetails;
      const newCard = createCard(name, link);
      renderCard(newCard, pointMount);
    }
  }, elementsSectionSelector);

  section.renderCards();


  // Изменение профиля 
  const modalWindowProfileSelector = '.modal__overlay_profile';
  const userNameSelector = '.profile__title';
  const userInfoSelector = '.profile__subtitle';
  const userNameInput = '.modal__description_type_name';
  const userInfoInput = '.modal__description_type_about-self';

  const modalWindowProfile = document.querySelector('.modal__overlay');
  const profile = document.querySelector('.profile');
  const editButton = profile.querySelector('.button_edit');
  const inputNameFormProfile = modalWindowProfile.querySelector(userNameInput);
  const inputAboutSelfFormProfile = modalWindowProfile.querySelector(userInfoInput);

  editButton.addEventListener('click', function () {
    const userCard = new UserInfo({ userNameSelector, userInfoSelector });

    const { userName, userInfo } = userCard.getUserInfo();

    inputNameFormProfile.value = userName;
    inputAboutSelfFormProfile.value = userInfo;

    const handleFormProfileSubmit = (inputValuesList) => {
      const [name, info] = inputValuesList;
      userCard.setUserInfo(name, info);
    }

    const profileEditPopup = new PopupWithForm(modalWindowProfileSelector, handleFormProfileSubmit);

    profileEditPopup.open();
  });


  // Форма добавления карточки
  const modalWindowAddNewCardSelector = '.modal__overlay_add';
  const formAddNewCardSelector = '.modal__add';

  const addButton = document.querySelector('.button_add');
  const formAddNewCard = document.querySelector(formAddNewCardSelector);
  const addNewCardButtonSubmit = formAddNewCard.querySelector('.button_submit');

  addButton.addEventListener('click', () => {
    const cardCreatePopup = new PopupWithForm(modalWindowAddNewCardSelector, handleFormAddSubmit);

    cardCreatePopup.open();
  })

  // functions block

  function createCard(name, link) {
    const card = new Card(name, link, '#cardTemplate', handleCardClick);
    return card.createCard();
  }

  function renderCard(newCard, pointMount) {
    pointMount.append(newCard);
  }

  function handleCardClick(element) {
    popupWithImage.open(element);
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