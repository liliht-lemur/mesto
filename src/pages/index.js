import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js'
import { Api } from '../components/Api.js';
import './index.css';

(() => {
  const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-64/cards',
    headers: {
      authorization: 'fbbc2820-3ad6-4359-8291-c4a6cd0cdb35',
      'Content-Type': 'application/json',
    }
  });

  const formList = document.querySelectorAll('.forms');
  const formValidatorsList = {}

  Array.from(formList).forEach(form => {
    const { formName, validator } = createFormValidator(form);
    validator.enableValidation();

    formValidatorsList[formName] = validator
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
    { handleSetUserInfo, handleSetNewAvatar }
  );


  popupWithConfirm.setEventListeners();
  popupWithImage.setEventListeners();
  cardCreatePopup.setEventListeners();
  profileEditPopup.setEventListeners();
  avatarEditPopup.setEventListeners();


  // Изменение профиля 


  const userNameInput = '.modal__description_type_name';
  const userInfoInput = '.modal__description_type_about-self';
  const modalWindowProfile = document.querySelector('.modal__overlay');
  const profile = document.querySelector('.profile');
  const buttonEdit = profile.querySelector('.button_edit');
  const avatarSetButton = profile.querySelector('.button_edit-avatar');

  //const buttonSubmitAvatar = document.querySelector('.button_submit-avatar');
  // const buttonSubmitEdit = document.querySelector('.button_submit-edit');

  const inputNameFormProfile = modalWindowProfile.querySelector(userNameInput);
  const inputAboutSelfFormProfile = modalWindowProfile.querySelector(userInfoInput);

  avatarSetButton.addEventListener('click', function () {
    avatarEditPopup.open();
  });

  // Форма добавления карточки

  const formAddNewCardSelector = '.modal__add';
  const buttonAdd = document.querySelector('.button_add');
  const formAddNewCard = document.querySelector(formAddNewCardSelector);
  const buttonSubmitAddCard = formAddNewCard.querySelector('.button_submit');

  buttonAdd.addEventListener('click', () => {
    cardCreatePopup.open();
  })

  let myId;
  let cardsSection;

  Promise.all([
    api.getAboutMe(),
    api.getInitialCards()
  ])
    .then((values) => {
      const [result1, result2] = values;
      const myProfileDetails = typeof result1 === 'object' ? result1 : result2;
      const initialCardsDetails = Array.isArray(result1) ? result1 : result2;
      const { _id: ownerId, name, about, avatar } = myProfileDetails;

      myId = ownerId;

      userCard.setUserInfo(name, about);
      userCard.setUserAvatar(avatar);

      cardsSection = new Section({
        cardDetailsList: initialCardsDetails,
        renderer: (cardDetails, pointMount) => {
          const { name, link, likes, owner, _id: cardId } = cardDetails;
          const { _id: cardOwnerId } = owner;

          const newCard = createCard({ title: name, link, likes, cardId, ownerId, cardOwnerId });

          renderCard(newCard, pointMount);
        }
      }, elementsSectionSelector);

      buttonEdit.addEventListener('click', async function () {
        const { userName, userInfo } = userCard.getUserInfo();

        inputNameFormProfile.value = userName;
        inputAboutSelfFormProfile.value = userInfo;

        profileEditPopup.open();
      });


      cardsSection.renderCards();
    })
    .catch(e => console.log(e));



  // functions block

  function handleDeleteCardButtonClick(card) {
    popupWithConfirm.open(card);
  }

  function handleDeleteCardSubmit(cardId) {
    return api.deleteCard(cardId);
  }

  function handleFormAvatarSubmit(inputValuesList) {
    const [avatar] = inputValuesList;
    return userCard.setUserAvatar(avatar);

    // buttonSubmitAvatar.textContent = 'Сохранить';
  }

  function handleFormProfileSubmit(inputValuesList) {
    const [name, info] = inputValuesList;
    return userCard.setUserInfo(name, info);

    // buttonSubmitEdit.textContent = 'Сохранить';
  }

  function createCard(details) {
    const card = new Card(
      details,
      '#cardTemplate',
      handleCardClick,
      handleDeleteCardButtonClick,
      handleLikeUpdate,
    );

    return card.createCard();
  }

  function renderCard(newCard, pointMount) {
    pointMount.append(newCard);
  }

  function handleCardClick(event) {
    popupWithImage.open(event.target);
  }

  function handleSetUserInfo(name, about) {
    return api.updateAboutMe(name, about);
  }

  function handleSetNewAvatar(avatar) {
    return api.updateMyAvatar(avatar);
  }

  function handleLikeUpdate(isLiked, cardId) {
    return isLiked
      ? api.removeLike(cardId)
      : api.addLike(cardId);
  }

  function createFormValidator(form) {
    const formName = form.getAttribute('name');

    return {
      formName,
      validator: new FormValidator({
        inputSelector: '.modal__description',
        submitButtonSelector: '.button_submit',
        inactiveButtonClass: 'button_submit-disabled',
        inputErrorClass: 'modal__description_type_error',
        errorClass: 'modal__description-error_active'
      }, form
      )
    }
  }

  function handleFormAddSubmit(inputValuesList) {
    const [nameValue, linkValue] = inputValuesList;

    return api.createCard(nameValue, linkValue)
      .then((card) => {
        const { name, link, likes, owner, _id: cardId } = card;
        const { _id: cardOwnerId } = owner;
        const newCard = createCard({ title: name, link, likes, cardId, ownerId: myId, cardOwnerId });
        cardsSection.addItem(newCard);
      })
      .then(() => {
        formValidatorsList.add_card.disableSubmitButton(buttonSubmitAddCard);
      });
  }

})();

