const modalWindow = document.querySelector('.modal__overlay');
const modalClose = modalWindow.querySelector('.modal__close');
const modalName = modalWindow.querySelector('.modal__description_type_name');
const modalAboutSelf = modalWindow.querySelector('.modal__description_type_about-self');
const form = modalWindow.querySelector('.modal__edit');

const profile = document.querySelector('.profile');
const myName =  profile.querySelector('.profile__title');
const aboutSelf = profile.querySelector('.profile__subtitle');
const editButton = profile.querySelector('.button_edit');



editButton.addEventListener('click', function(){
  modalWindow.classList.add('modal__overlay_active');
  modalName.value = myName.textContent;
  modalAboutSelf.value = aboutSelf.textContent;
});
modalClose.addEventListener('click', function(){
  modalWindow.classList.remove('modal__overlay_active');
});  

function handleFormSubmit (evt) {
  evt.preventDefault();
  myName.textContent = modalName.value;
  aboutSelf.textContent = modalAboutSelf.value;
  modalWindow.classList.remove('modal__overlay_active');
}
form.addEventListener('submit', handleFormSubmit); 

