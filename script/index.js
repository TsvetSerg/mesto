import Card from "./Card.js";
import {openPopup, closePopup} from "./utils.js"
import FormValidator from "./FormValidator.js"
import Section from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

// popup ---------------------------------------------------------------
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const modalPopupImg = document.querySelector('.popup-card');
const imgBig = document.querySelector('.element__image')
// button ---------------------------------------------------------------
const editButton = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
// const closeProfileButton = popupEdit.querySelector('.popup__close-button');
// const closeAddButton = popupAdd.querySelector('.popup__close-button')
// const closeimageButton = modalPopupImg.querySelector('.popup__close-button')
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
const settings = {
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


const stockCard = new Section({        // Создаем стоковые карточки
  items: initialCards,
  renderer: (items) => {stockCard.addItem(createCard(items))}
  }, '.elements')
stockCard.renderItems();

const bigImagePopup = new PopupWithImage(modalPopupImg)

function createCard(item) {            // функция создания новой карточки
  const cardNew = new Card({
    data: item,
    handlerCardClick: () => {bigImagePopup.setEventListeners();
      bigImagePopup.open(item.link, item.name)
    }
  }, '.template-data');
  const elementData = cardNew.generateCard();
  return elementData;
}

// function renderCard(data) {
//   const element = createCard(data, '.template-data')
//   return element;
// };


// function handlerCardClick(link, name) {    // Открываем модалку картинки
//   new PopupWithImage(modalPopupImg).open(link, name);
// }


// function cardSubmitHandler (evt) {
//   evt.preventDefault();
//   addCard(list, createCard({
//     name: inputCardTitle.value,
//     link: inputCardImg.value
//   }));

//   closePopup(popupAdd);
//   cardFormPopup.reset();
//   validatorFormAddPicture.resetValidation();
// };

// function formSubmitHandler (evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileJobe.textContent = jobInput.value;
//   validatorFormAddPicture.resetValidation();
//   closePopup(popupEdit);
// };

//  const profilValue = new UserInfo({
//     nameSelector: profileName,
//     jobSelector: profileJobe
//   });
//   profilValue.setUserInfo('Жак-Ив Кусто', 'Исследователь океана')

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector:'.profile__job'
})

const popupProfile = new PopupWithForm({
  selectorPopup: '.popup-edit',
  submitCallBack: (data) => {
    userInfo.setUserInfo(data)
  }
})
popupProfile.setEventListeners();

const popupAddCard = new PopupWithImage({
  selectorPopup: '.popup-add',
  submitCallBack: ({title, link}) => {
    const item = {
      name: title,
      link: link
    }
    stockCard.addItem(createCard(item));
  }
})
popupAddCard.setEventListeners();


const handlerPopupAddCard = () => {
  popupAddCard.open();
}

const handlerPopupProfile = () => {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  popupProfile.open();
}


editButton.addEventListener('click', handlerPopupProfile);
buttonAdd.addEventListener('click', handlerPopupAddCard)



// closeProfileButton.addEventListener('click', () => {
//   new Popup(popupEdit).close();
// });

// closeAddButton.addEventListener('click', () => {

//   closePopup(popupAdd);
// });

// closeimageButton.addEventListener('click', () => {
//   bigImagePopup.close();
// });

// formElement.addEventListener('submit', formSubmitHandler);

// buttonAdd.addEventListener('click', () => {
//   popupAddForm.open()
// });

// cardFormPopup.addEventListener('submit', cardSubmitHandler);

