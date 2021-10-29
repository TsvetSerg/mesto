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
  popupDelet,
  popupAvatar,
  buttonAdd,
  avatarButton,
  deletButton,
  nameInput,
  jobInput,
  profileName,
  profileJobe,
  inputCardTitle,
  inputCardImg,
  initialCards,
  profilImg,
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
    userInfo.setUserInfo({inputName: items[0].name, inputJob: items[0].about, avatarInpur: items[0].avatar})
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
    cardDeletClick: (id, cardElement) => {
      deletPopup.open(id, cardElement)
    }
  }, '.template-data', userId, api);
  const elementData = cardNew.generateCard();
  return elementData;
}

const deletPopup = new PopupWithConfirmation(popupDelet,{
  submitCallBack: (_id, cardElement) => {
    api.deleteCard(_id)
    .then(() => {
      cardElement.remove()
      deletPopup.close()
    })
  }
})
deletPopup.setEventListeners();

const handeleDeletPopup = () => {
  deletPopup.open()
}


const bigImagePopup = new PopupWithImage(modalPopupImg)
bigImagePopup.setEventListeners();

const userInfo = new UserInfo({      // даем вхоодные данные
  profileName: profileName,
  profileJob: profileJobe,
  profileAvatar: profilImg
  })


const popupProfile = new PopupWithForm(popupEdit,{   // Создаем экземпляр класса формы проофиля с колбэк функцией
  submitCallBack: (input) => {
    popupProfile.loadSubmit()
    api.patchInfoUser(input)
    .then((data) => {
      userInfo.setUserInfo({inputName: data.name, inputJob: data.about, avatarInpur: data.avatar})
    })
    .catch(err => {
      console.log(err)
    })
  }
});
popupProfile.setEventListeners();

const popupNewAvatar = new PopupWithForm(popupAvatar, {
  submitCallBack: (input) => {
    popupNewAvatar.loadSubmit()
    api.patchNewAvatar(input)
    .then((data) => {
      userInfo.setUserInfo({inputName: data.name, inputJob: data.about, avatarInpur: data.avatar})
    })
    .catch(err => {
      console.log(err)
    })
  }
})
popupNewAvatar.setEventListeners();

const handlerPopupAvatar = () => {
  popupNewAvatar.open();
}

const handlerPopupProfile = () => {   // функция для использоование в лиссенерах и логика действимй
  const  userData = userInfo.getUserInfo();
  popupProfile.open();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
  validatorFormEditProfile.resetValidation();

}

const popupAddCard = new PopupWithForm(popupAdd, { // Создаем экземпляр класса формы добавления карточки с колбэк функцией
  submitCallBack: (inputValue) => {
    popupAddCard.loadSubmit()
    api.postNewCard(inputValue)
    .then((data) => {
      stockCard.addItem(createCard(data))
    })
    .catch(err => {
      console.log(err)
    })
    }
  })

  popupAddCard.setEventListeners();


const handlerPopupAddCard = () => {         // функция для использоование в лиссенерах и логика действимй
  validatorFormAddPicture.resetValidation();
  popupAddCard.open();
}


//========================= EventListeners =========================//

editButton.addEventListener('click', handlerPopupProfile);
buttonAdd.addEventListener('click', handlerPopupAddCard);
avatarButton.addEventListener('click', handlerPopupAvatar)



//=========================== Validation ===========================//

const validatorFormEditProfile = new FormValidator(popupEdit, settings);
validatorFormEditProfile.enableValidation();
const validatorFormAddPicture = new FormValidator(popupAdd, settings);
validatorFormAddPicture.enableValidation();
const validatorFormAvatarProfile = new FormValidator(popupAvatar, settings);
validatorFormAvatarProfile.enableValidation()


