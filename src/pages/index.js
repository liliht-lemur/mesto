import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Api } from '../components/Api.js';
import './index.css';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js'

(async () => {
  const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-64/cards',
    headers: {
      authorization: 'fbbc2820-3ad6-4359-8291-c4a6cd0cdb35',
      'Content-Type': 'application/json',
    }
  });

  const initialCardsDetails = await api.getInitialCards();
  const myProfileDetails = await api.getAboutMe();
  const { _id: ownerId, name, about, avatar } = myProfileDetails;

  const formList = document.querySelectorAll('.forms');

  const formValidatorsList = Array.from(formList).map(form => {
    const formValidator = createFormValidator(form);
    formValidator.enableValidation();
    return formValidator;
  });

  const elementsSectionSelector = '.elements';
  const modalWindowImgSelector = '.modal__overlay_img';
  const modalWindowConfirmSelector = '.modal__overlay_delete';
  const modalWindowAddNewCardSelector = '.modal__overlay_add';
  const modalWindowProfileSelector = '.modal__overlay_profile';
  const modalWindowAvatarSelector = '.modal__overlay_avatar';
  const userNameSelector = '.profile__title';
  const userInfoSelector = '.profile__subtitle';
  const userAvatarSelector = '.profile__image'

  // Create classes section
  const popupWithImage = new PopupWithImage(modalWindowImgSelector);
  const popupWithConfirm = new PopupWithConfirmation(modalWindowConfirmSelector, handleDeleteCardSubmit);
  const cardCreatePopup = new PopupWithForm(modalWindowAddNewCardSelector, handleFormAddSubmit);
  const profileEditPopup = new PopupWithForm(modalWindowProfileSelector, handleFormProfileSubmit);
  const avatarEditPopup = new PopupWithForm(modalWindowAvatarSelector, handleFormAvatarSubmit);
  const userCard = new UserInfo(
    { userNameSelector, userInfoSelector, userAvatarSelector },
    { handleGetUserInfo, handleSetUserInfo, handleSetNewAvatar }
  );

  await userCard.setUserInfo(name, about);
  await userCard.setUserAvatar(avatar);

  const cardsSection = new Section({
    cardDetailsList: initialCardsDetails,
    renderer: (cardDetails, pointMount) => {
      const { name, link, likes, owner, _id: cardId } = cardDetails;
      const { _id: cardOwnerId } = owner;

      const newCard = createCard({ title: name, link, likes, cardId, ownerId, cardOwnerId });

      renderCard(newCard, pointMount);
    }
  }, elementsSectionSelector);

  popupWithConfirm.setEventListeners();
  popupWithImage.setEventListeners();
  cardCreatePopup.setEventListeners();
  profileEditPopup.setEventListeners();
  avatarEditPopup.setEventListeners();
  cardsSection.renderCards();

  // Изменение профиля 


  const userNameInput = '.modal__description_type_name';
  const userInfoInput = '.modal__description_type_about-self';

  const modalWindowProfile = document.querySelector('.modal__overlay');
  const profile = document.querySelector('.profile');
  const buttonEdit = profile.querySelector('.button_edit');
  const avatarSetButton = profile.querySelector('.button_edit-avatar');
  const buttonSubmitAvatar = document.querySelector('.button_submit-avatar');
  const buttonSubmitEdit = document.querySelector('.button_submit-edit');

  const inputNameFormProfile = modalWindowProfile.querySelector(userNameInput);
  const inputAboutSelfFormProfile = modalWindowProfile.querySelector(userInfoInput);

  buttonEdit.addEventListener('click', async function () {
    const { userName, userInfo } = await userCard.getUserInfo();

    inputNameFormProfile.value = userName;
    inputAboutSelfFormProfile.value = userInfo;

    profileEditPopup.open();
  });

  avatarSetButton.addEventListener('click', function () {
    avatarEditPopup.open();
  });

  // Форма добавления карточки

  const formAddNewCardSelector = '.modal__add';

  const buttonAdd = document.querySelector('.button_add');
  const formAddNewCard = document.querySelector(formAddNewCardSelector);
  const addNewCardButtonSubmit = formAddNewCard.querySelector('.button_submit');

  buttonAdd.addEventListener('click', () => {
    cardCreatePopup.open();
  })



  // functions block

  function handleDeleteCardButtonClick(card) {
    popupWithConfirm.open(card);
  }

  async function handleDeleteCardSubmit(cardId) {
    return api.deleteCard(cardId);
  }




  async function handleFormAvatarSubmit(inputValuesList) {
    buttonSubmitAvatar.textContent = 'Сохранение...';

    const [avatar] = inputValuesList;
    await userCard.setUserAvatar(avatar);

    buttonSubmitAvatar.textContent = 'Сохранить';
  }

  async function handleFormProfileSubmit(inputValuesList) {
    buttonSubmitEdit.textContent = 'Сохранение...';

    const [name, info] = inputValuesList;
    await userCard.setUserInfo(name, info);

    buttonSubmitEdit.textContent = 'Сохранить';
  }

  function createCard(details) {
    const card = new Card(
      details,
      '#cardTemplate',
      handleCardClick,
      handleDeleteCardButtonClick,
      {
        add: handleLikeAddClick,
        remove: handleLikeRemoveClick,
      },
    );

    return card.createCard();
  }

  function renderCard(newCard, pointMount) {
    pointMount.append(newCard);
  }














  function handleCardClick(event) {
    popupWithImage.open(event.target);
  }

  async function handleGetUserInfo() {
    return api.getAboutMe();
  }

  async function handleSetUserInfo(name, about) {
    return api.updateAboutMe(name, about);
  }

  async function handleSetNewAvatar(avatar) {
    return api.updateMyAvatar(avatar);
  }

  async function handleLikeAddClick(cardId) {
    return api.addLike(cardId);
  }

  function handleLikeRemoveClick(cardId) {
    return api.removeLike(cardId);
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

  async function handleFormAddSubmit(inputValuesList) {
    const [nameValue, linkValue] = inputValuesList;

    addNewCardButtonSubmit.textContent = 'Создание...';

    const insertResult = await api.createCard(nameValue, linkValue);

    const { name, link, likes, owner, _id: cardId } = insertResult;
    const { _id: cardOwnerId } = owner;

    const newCard = createCard({ title: name, link, likes, cardId, ownerId, cardOwnerId });

    addNewCardButtonSubmit.textContent = 'Создать';

    cardsSection.addItem(newCard);

    formValidatorsList[1].disableSubmitButton(addNewCardButtonSubmit);
  }

})();

