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




const stockCard = new Section({        // Создаем стоковые карточки
  items: initialCards,
  renderer: (items) => {stockCard.addItem(createCard(items))}
  }, '.elements')
stockCard.renderItems();



function createCard(item) {            // функция создания новой карточки
  const cardNew = new Card({
    data: item,
    handlerCardClick: () => {                       //в данную колбэк функцию передаем что в каждой новой карточке будет лежать попап картинки
      bigImagePopup.open(item.link, item.name)      // и при любом создании карточки функция будет работаь
    }
  }, '.template-data');
  const elementData = cardNew.generateCard();
  return elementData;
}

const bigImagePopup = new PopupWithImage(modalPopupImg)
bigImagePopup.setEventListeners();

const userInfo = new UserInfo({       // даем вхоодные данные
  profileName: profileName,
  profileJob: profileJobe
  })


const popupProfile = new PopupWithForm(popupEdit,{   // Создаем экземпляр класса формы проофиля с колбэк функцией
  submitCallBack: (user) => {
    userInfo.setUserInfo(user);    // передаем данные нового проофиля в html(открисовываем)
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
  submitCallBack: () => {
    const item = {      // Создаем объект из значений инпутов
      name: inputCardTitle.value,
      link: inputCardImg.value
    }
    validatorFormAddPicture.enableValidation()     // естли какие то способы прооверить сколько раз создается это слушатель??
    stockCard.addItem(createCard(item));    // Создаем еще картоочку но данные в нее передем из объекта
  }
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
