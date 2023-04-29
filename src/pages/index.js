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


  const userCard = new UserInfo(userNameSelector, userInfoSelector, userAvatarSelector);
  // { handleSetUserInfo, handleSetNewAvatar }

  popupWithConfirm.setEventListeners();
  popupWithImage.setEventListeners();
  cardCreatePopup.setEventListeners();
  profileEditPopup.setEventListeners();
  avatarEditPopup.setEventListeners();

  const userNameInput = '.modal__description_type_name';
  const userInfoInput = '.modal__description_type_about-self';
  const modalWindowProfile = document.querySelector('.modal__overlay');
  const profile = document.querySelector('.profile');
  const buttonEdit = profile.querySelector('.button_edit');
  const avatarSetButton = profile.querySelector('.button_edit-avatar');
  const inputNameFormProfile = modalWindowProfile.querySelector(userNameInput);
  const inputAboutSelfFormProfile = modalWindowProfile.querySelector(userInfoInput);
  const formAddNewCardSelector = '.modal__add';
  const buttonAdd = document.querySelector('.button_add');
  const formAddNewCard = document.querySelector(formAddNewCardSelector);
  const buttonSubmitAddCard = formAddNewCard.querySelector('.button_submit');
  const buttonSubmitEdit = document.querySelector('.button_submit-edit');
  const buttonSubmitAvatar = document.querySelector('.button_submit-avatar');
  const buttonSubmitDelete = document.querySelector('.button_submit-delete');

  avatarSetButton.addEventListener('click', function () {
    avatarEditPopup.open();
  });

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
      const [myProfileDetails, initialCardsDetails] = values;
      const { _id: userId, name, about, avatar } = myProfileDetails;

      myId = userId;

      userCard.setUserInfo(name, about);
      userCard.setUserAvatar(avatar);

      cardsSection = new Section({
        cardDetailsList: initialCardsDetails,
        renderer: function (cardDetails) {
          const { name, link, likes, owner, _id: cardId } = cardDetails;
          const { _id: ownerId } = owner;

          const newCard = createCard({ title: name, link, likes, cardId, userId, ownerId });

          this.addItem(newCard);
        }
      }, elementsSectionSelector);

      buttonEdit.addEventListener('click', function () {
        const { userName, userInfo } = userCard.getUserInfo();

        inputNameFormProfile.value = userName;
        inputAboutSelfFormProfile.value = userInfo;

        profileEditPopup.open();
      });

      cardsSection.renderCards();
    })
    .catch(e => console.log(e));



  // ---------------------------------------- all functions block ---------------------------------------- 

  // submit callbacks block

  function handleFormAvatarSubmit(inputValues) {
    const [avatar] = inputValues;

    avatarEditPopup.setButtonText('Сохранение...');

    return api.updateMyAvatar(avatar)
      .then((details) => {
        userCard.setUserAvatar(details.avatar);
        avatarEditPopup.close();
      })
      .catch(e => console.log(e))
      .finally(() => {
        avatarEditPopup.setButtonText('Сохранить');
      });
  }

  function handleFormProfileSubmit(inputValues) {
    const [name, info] = inputValues;

    profileEditPopup.setButtonText('Сохранение...');

    return api.updateAboutMe(name, info)
      .then((details) => {
        userCard.setUserInfo(details.name, details.about);
        profileEditPopup.close();
      })
      .catch(e => console.log(e))
      .finally(() => {
        profileEditPopup.setButtonText('Сохранить');
      });
  }

  function handleFormAddSubmit(inputValues) {
    const [nameValue, linkValue] = inputValues;

    cardCreatePopup.setButtonText('Создание...');

    return api.createCard(nameValue, linkValue)
      .then((card) => {
        const { name, link, likes, owner, _id: cardId } = card;
        const { _id: ownerId } = owner;
        const newCard = createCard({ title: name, link, likes, cardId, userId: myId, ownerId });
        cardsSection.addItem(newCard);
      })
      .then(() => {
        formValidatorsList.add_card.disableSubmitButton(buttonSubmitAddCard);
        cardCreatePopup.close();
      })
      .catch(e => console.log(e))
      .finally(() => {
        cardCreatePopup.setButtonText('Создать');
      });
  }

  function handleDeleteCardSubmit(card) {
    const cardId = card.getId();

    popupWithConfirm.setButtonText('Удаление...');

    return api.deleteCard(cardId)
      .then(() => {
        card.deleteCard();
        this.close();
      })
      .catch((e) => console.log(e))
      .finally(() => {
        popupWithConfirm.setButtonText('Да');
      });
  }


  // other callbacks block

  function handleDeleteCardButtonClick(card) {
    popupWithConfirm.open(card);
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

  function handleCardClick(card) {
    popupWithImage.open(card);
  }

  function handleLikeUpdate(card) {
    const cardId = card.getId();

    const response = card.isILike
      ? api.removeLike(cardId)
      : api.addLike(cardId);

    return response
      .then(newCard => {
        const { likes } = newCard;
        card.updateLikes(likes);
      })
      .catch(e => console.log(e))
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

})();

