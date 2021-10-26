import './index.css'
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  popupEdit,
  popupAdd,
  modalPopupImg,
  editButton,
  buttonAdd,
  nameInput,
  jobInput,
  profileName,
  profileJobe,
  inputCardTitle,
  inputCardImg,
  initialCards,
  settings
} from "../utils/constant.js"
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js"


const api = new Api({                             // записываем стартовый экземпляп
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-29',
  headers: {
    authorization: 'dea64c58-8b87-4560-8045-05c229ce594b',
    'Content-Type': 'application/json'
  }
});

const dataProfile = api.getInfoUser();          // делаем запрос и результат записываем в переменные
const dataInitialCards = api.getInitialCards();

let userId;                             // сюда будем складыватьь ID
Promise.all([dataProfile, dataInitialCards])
  .then((items) => {
    userInfo.setUserInfo({inputName: items[0].name, inputJob: items[0].about})
    userId = items[0]._id
    stockCard.renderItems(items[1])
  })
  .catch((err) => {
    console.log(err);
  })



const stockCard = new Section({        // Создаем стоковые карточки
  renderer: (items) => {stockCard.addItem(createCard(items))}
  }, '.elements')



function createCard(item) {            // функция создания новой карточки
  const cardNew = new Card({
    data: item,
    handlerCardClick: () => {                       //в данную колбэк функцию передаем что в каждой новой карточке будет лежать попап картинки
      bigImagePopup.open(item.link, item.name)     // и при любом создании карточки функция будет работаь
    },
    cardDeletClick: () => {
      deletPopup.open(item._id)
    }
  }, '.template-data', userId == item.owner._id);
  const elementData = cardNew.generateCard();
  return elementData;
}

const deletPopup = new PopupWithConfirmation(popupDel,{
  submitCallBack: function() {
      if (this._canDel) {
        api.deleteCard(this._id);
        this._element.remove();
      }}
})


const bigImagePopup = new PopupWithImage(modalPopupImg)
bigImagePopup.setEventListeners();

const userInfo = new UserInfo({      // даем вхоодные данные
  profileName: profileName,
  profileJob: profileJobe
  })


const popupProfile = new PopupWithForm(popupEdit,{   // Создаем экземпляр класса формы проофиля с колбэк функцией
  submitCallBack: (input) => {
    api.patchInfoUser(input)
    .then((data) => {
      userInfo.setUserInfo({inputName: data.name, inputJob: data.about})
    })
    .catch(err => {
      console.log(err)
    })

    // user.setUserInfo(input);    // передаем данные нового проофиля в html(открисовываем)
  }
});
popupProfile.setEventListeners();


const handlerPopupProfile = () => {   // функция для использоование в лиссенерах и логика действимй
  const  userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  validatorFormEditProfile.resetValidation();
  popupProfile.open();
}

const popupAddCard = new PopupWithForm(popupAdd, { // Создаем экземпляр класса формы добавления карточки с колбэк функцией
  submitCallBack: (inputValue) => {
    api.postNewCard(inputValue)
    .then((data) => {
      stockCard.addItem(createCard(data))
    })
    .catch(err => {
      console.log(err)
    })
    }
    // stockCard.addItem(createCard(add));    // Создаем еще картоочку но данные в нее передем из объекта
  })

  popupAddCard.setEventListeners();


const handlerPopupAddCard = () => {         // функция для использоование в лиссенерах и логика действимй
  validatorFormAddPicture.resetValidation();
  popupAddCard.open();
}


//========================= EventListeners =========================//

editButton.addEventListener('click', handlerPopupProfile);
buttonAdd.addEventListener('click', handlerPopupAddCard)

//=========================== Validation ===========================//

const validatorFormEditProfile = new FormValidator(popupEdit, settings);
validatorFormEditProfile.enableValidation();
const validatorFormAddPicture = new FormValidator(popupAdd, settings);
validatorFormAddPicture.enableValidation();


const deletbtn = document.querySelector('.element__delete');
const popupDel = document.querySelector('.popup-delet')
s
