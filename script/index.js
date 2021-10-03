import Card from "./Card.js";
import {openPopup, closePopup} from "./utils.js"
import FormValidator from "./FormValidator.js"

// popup ---------------------------------------------------------------
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const modalPopupImg = document.querySelector('.popup-card');

// button ---------------------------------------------------------------
const editButton = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const closeProfileButton = popupEdit.querySelector('.popup__close-button');
const closeAddButton = popupAdd.querySelector('.popup__close-button')
const closeimageButton = modalPopupImg.querySelector('.popup__close-button')
const formElement = popupEdit.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const cardFormPopup = popupAdd.querySelector('.popup__form');

// DOM ---------------------------------------------------------------
const profileName = document.querySelector('.profile__name');
const profileJobe = document.querySelector('.profile__job');
const list = document.querySelector('.elements')
const inputCardTitle = cardFormPopup.querySelector('.popup__input_image_name');
const inputCardImg = cardFormPopup.querySelector('.popup__input_link');
const initialCards = [
  {
    name: 'Harley-Davidson',
    link: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80'
  },
  {
    name: 'BMW',
    link: 'https://images.unsplash.com/photo-1531327431456-837da4b1d562?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1964&q=80'
  },
  {
    name: 'KTM',
    link: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Ducati',
    link: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'HD Electraglide',
    link: 'https://images.pexels.com/photos/258092/pexels-photo-258092.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    name: 'Yamaha v-max',
    link: 'https://images.unsplash.com/photo-1569932353500-6ea3302c4116?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=716&q=80'
  }
];
const settings = {   // спасибо, это действительно более красиво и более читабильно)))
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const validatorFormEditProfile = new FormValidator(popupEdit, settings);
validatorFormEditProfile.enableValidation();
const validatorFormAddPicture = new FormValidator(popupAdd, settings);
validatorFormAddPicture.enableValidation();

// проходимся по массиву и создаем новую карточку из класса

initialCards.forEach((item) => {
  addCard(list, createCard(item))
});

function createCard(item) {            // функция создания новой карточки
  const cardNew = new Card(item, '.template-data');
  const elementData = cardNew.generateCard();
  return elementData;
}

function addCard (container, cardElement) {   //функция добавление картоочки
  container.prepend(cardElement);
}

function cardSubmitHandler (evt) {
  evt.preventDefault();
  addCard(list, createCard({
    name: inputCardTitle.value,
    link: inputCardImg.value
  }));

  closePopup(popupAdd);
  cardFormPopup.reset();
  validatorFormAddPicture.resetValidation();
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJobe.textContent = jobInput.value;
  validatorFormAddPicture.resetValidation();
  closePopup(popupEdit);
};

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJobe.textContent;
});
closeProfileButton.addEventListener('click', () => {
  closePopup(popupEdit);    // тут просто невнимательность) действительно я понимал что валидация при закрытии не нужна, спасибо))
});
closeAddButton.addEventListener('click', () => {

  closePopup(popupAdd);
});
closeimageButton.addEventListener('click', () => {
  closePopup(modalPopupImg);
});
formElement.addEventListener('submit', formSubmitHandler);
buttonAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});
cardFormPopup.addEventListener('submit', cardSubmitHandler);

// Спасибо большое, вы крутой ревьюер, все по факту и очень хорошо разъяснены ошибки, спасибо!


