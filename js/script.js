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
const elements = document.querySelector('.elements');

initialCards.forEach(createCard);

const modalWindow = document.querySelector('.modal__overlay');
const modalClose = modalWindow.querySelector('.modal__close');
const modalName = modalWindow.querySelector('.modal__description_type_name');
const modalAboutSelf = modalWindow.querySelector('.modal__description_type_about-self');
const form = modalWindow.querySelector('.modal__edit');

const profile = document.querySelector('.profile');
const myName =  profile.querySelector('.profile__title');
const aboutSelf = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.button_edit');
const addButton = profile.querySelector('.button_add');

// Изменение профиля 

editButton.addEventListener('click', function(){
  modalWindow.classList.add('modal__overlay_active');
  modalName.value = myName.textContent;
  modalAboutSelf.value = aboutSelf.textContent;
});

addClickEvent(modalClose, modalWindow, false);

form.addEventListener('submit', handleFormSubmit);

// Форма добавления карточки

const modalWindowAdd = document.querySelector('.modal__overlay_add');
const modalCloseAdd = modalWindowAdd.querySelector('.modal__close_add');

addClickEvent(addButton, modalWindowAdd );
addClickEvent(modalCloseAdd, modalWindowAdd, false);


const formAdd = document.querySelector('.modal__add');
formAdd.addEventListener('submit', handleFormAddSubmit);





// block with functions

function addClickEvent(target, item, isAddEvent = true) {
  target.addEventListener('click', function(){
    isAddEvent ? item.classList.add('modal__overlay_active') : item.classList.remove('modal__overlay_active');
  })
}


function handleFormAddSubmit (evt) {
  evt.preventDefault();
  const form = evt.target;
  const name = form.querySelector('.modal__description_type_heading').value;
  const link = form.querySelector('.modal__description_type_link').value;
  const card = {name, link};
  createCard(card, false);
  modalWindowAdd.classList.remove('modal__overlay_active');
}

function createCard(item, isDefaultCard = true) {
  const newCard = document.querySelector('#cardTemplate').content.cloneNode(true);
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
  isDefaultCard ? elements.append(newCard)  : elements.prepend(newCard);

  const modalWindowImg = document.querySelector('.modal__overlay_img');
  const modalCloseImg = modalWindowImg.querySelector('.modal__close_img');

  cardImage.addEventListener('click', function(event){
    modalWindowImg.classList.add('modal__overlay_active');
    resizeCard(event.target, item.name);
  })

  addClickEvent(modalCloseImg, modalWindowImg, false);
}


  // Увеличение изображения карточки
function resizeCard(item, title) {
  const imageTitle = document.querySelector('.modal__title_img');
  const imagePhoto = document.querySelector('.modal__photo');

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

function handleFormSubmit (evt) {
  evt.preventDefault();
  myName.textContent = modalName.value;
  aboutSelf.textContent = modalAboutSelf.value;
  modalWindow.classList.remove('modal__overlay_active');
}


