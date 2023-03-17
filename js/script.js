// Создание карточек из коробки

const initialCards = [
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
const template = document.querySelector('#cardTemplate');
const elements = document.querySelector('.elements');

initialCards.forEach(renderCard);

const modalWindowProfile = document.querySelector('.modal__overlay');
const buttonCloseModalWindowProfile = modalWindowProfile.querySelector('.modal__close');
const inputNameFormProfile = modalWindowProfile.querySelector('.modal__description_type_name');
const inputAboutSelfFormProfile = modalWindowProfile.querySelector('.modal__description_type_about-self');
const formProfile = modalWindowProfile.querySelector('.modal__edit');

const profile = document.querySelector('.profile');
const myName =  profile.querySelector('.profile__title');
const aboutSelf = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.button_edit');
const addButton = profile.querySelector('.button_add');


const modalWindowImg = document.querySelector('.modal__overlay_img');
const modalCloseImg = modalWindowImg.querySelector('.modal__close_img');

// Изменение профиля 

editButton.addEventListener('click', function(){
  toggleVisibilityModalWindow(modalWindowProfile);
  inputNameFormProfile.value = myName.textContent;
  inputAboutSelfFormProfile.value = aboutSelf.textContent;
});

addClickEvent(buttonCloseModalWindowProfile, modalWindowProfile, false);

formProfile.addEventListener('submit', handleFormProfileSubmit);

// Форма добавления карточки

const modalWindowAddNewCard = document.querySelector('.modal__overlay_add');
const buttonCloseModalWindowAddNewCard = modalWindowAddNewCard.querySelector('.modal__close_add');

addClickEvent(addButton, modalWindowAddNewCard );
addClickEvent(buttonCloseModalWindowAddNewCard, modalWindowAddNewCard, false);


// close image modal window
const formAddNewCard = document.querySelector('.modal__add');
formAddNewCard.addEventListener('submit', handleFormAddSubmit);
addClickEvent(modalCloseImg, modalWindowImg, false);


const imageTitle = document.querySelector('.modal__title_img');
const imagePhoto = document.querySelector('.modal__photo');





// block with functions


function toggleVisibilityModalWindow(modalWindow, isNeedOpen = true ){
  isNeedOpen ? modalWindow.classList.add('modal__overlay_active') : modalWindow.classList.remove('modal__overlay_active');
}

function addClickEvent(target, item, isAddEvent = true) {
  target.addEventListener('click', function(){
    toggleVisibilityModalWindow(item, isAddEvent);
  })
}


function handleFormAddSubmit (evt) {
  evt.preventDefault();
  const form = evt.target;
  const name = form.querySelector('.modal__description_type_heading').value;
  const link = form.querySelector('.modal__description_type_link').value;
  const card = {name, link};
  renderCard(card, false);
  toggleVisibilityModalWindow(modalWindowAddNewCard, false);
}


function renderCard(cardDetails, isInsertLast=true) {
  const newCard = createCard(cardDetails);

  isInsertLast ? elements.append(newCard) : elements.prepend(newCard);
}


function createCard(item) {
  const newCard = template.content.firstElementChild.cloneNode(true);
  const cardTitle = newCard.querySelector('.element__title');

  cardTitle.textContent = item.name;

  const cardImage = newCard.querySelector('.element__photo');

  cardImage.setAttribute('src' , item.link);
  cardImage.setAttribute('alt' , item.name);

  // Лайк карточки
  const likeButton = newCard.querySelector('.element__like');

  likeButton.addEventListener('click', likeTheCard);

  // Удаление карточки
  const deleteButton = newCard.querySelector('.element__delete');
  deleteButton.addEventListener('click', handleDeleteButton);

  cardImage.addEventListener('click', function(event){
    toggleVisibilityModalWindow(modalWindowImg);
    resizeCard(event.target, item.name);
  })

  return newCard;
}


  // Увеличение изображения карточки
function resizeCard(item, title) {
  imageTitle.textContent = title;
  imagePhoto.setAttribute('src' , item.src);
  imagePhoto.setAttribute('alt' , item.alt);
}


function likeTheCard(event) {
  const button = event.target;
  button.classList.toggle('element__like_active');
  // event.target.classList.toggle('element__like_active');
};

function handleDeleteButton(event) {
  const button = event.target;
  const card = button.closest('.element');
  card.remove();
};

function handleFormProfileSubmit (evt) {
  evt.preventDefault();
  myName.textContent = inputNameFormProfile.value;
  aboutSelf.textContent = inputAboutSelfFormProfile.value;
  toggleVisibilityModalWindow(modalWindowProfile, false);
}


