
// popup ---------------------------------------------------------------
const popupEdit = document.querySelector('.popup-edit');
const popupAdd = document.querySelector('.popup-add');
const modalPopupImg = document.querySelector('.popup-card');
const popupAll = document.querySelectorAll('.popup');

// button ---------------------------------------------------------------
const editButton = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const closeProfileButton = popupEdit.querySelector('.popup__close-button');
const closeAddButton = popupAdd.querySelector('.popup__close-button')
const closeimageButton = modalPopupImg.querySelector('.popup__close-card')




const formElement = popupEdit.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');

const cardFormPopup = popupAdd.querySelector('.popup__form');

// DOM ---------------------------------------------------------------
const profileName = document.querySelector('.profile__name');
const profileJobe = document.querySelector('.profile__job');

const list = document.querySelector('.elements')



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


initialCards.forEach((cardData) => {
  addCard(list, createCard(cardData.name, cardData.link));
});

function createCard(name, link) {
  const templateData = document.querySelector('.template-data').content.querySelector('.element');
  const elementData = templateData.cloneNode(true);
  const cardImgData = elementData.querySelector('.element__image');
  const cardTitleData = elementData.querySelector('.element__title');
  const cardLikeData = elementData.querySelector('.element__like');
  const cardDeleteData = elementData.querySelector('.element__delete');


  const modalPopupTitle = modalPopupImg.querySelector('.popup__modal-title')
  const modalPopupImages = modalPopupImg.querySelector('.popup__modal-image')

  cardLikeData.addEventListener('click', () => {
    cardLikeData.classList.toggle('element__like_active');
  });

  cardDeleteData.addEventListener('click', () => {
    elementData.remove();
  });

  cardImgData.addEventListener('click', () => {
    openPopup(modalPopupImg);
    modalPopupTitle.textContent = name;
    modalPopupImages.src = link;
    modalPopupImages.alt = name;
  });

  cardImgData.src = link;
  cardTitleData.textContent = name;
  cardImgData.alt = name;

  // list.prepend(elementData);
  return elementData;
}


function addCard (container, cardElement) {
  container.prepend(cardElement);
}



// функции открытия и закрития popup
function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscPress);
  document.addEventListener('click', handleClickOver);
};

function closePopup(popupItem) {
  popupItem.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscPress);
  document.removeEventListener('click', handleClickOver);
  };



function handleEscPress(evt) {
    if (evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_opened'));
    }
};

function handleClickOver(evt) {
  if (evt.target.classList.contains('popup')) {
  closePopup(document.querySelector('.popup_opened'));
  }
};

function cardSubmitHandler (evt) {
  evt.preventDefault();
  const inputCardTitle = cardFormPopup.querySelector('.popup__input_image_name');
  const inputCardImg = cardFormPopup.querySelector('.popup__input_link');

  addCard(list, createCard(inputCardTitle.value, inputCardImg.value));
  closePopup(popupAdd);
  cardFormPopup.reset();

};



function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJobe.textContent = jobInput.value;
  closePopup(popupEdit);
};



editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJobe.textContent;
});
closeProfileButton.addEventListener('click', () => {
  closePopup(popupEdit);
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


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});




