let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJobe = document.querySelector('.profile__job');
let buttonAdd = document.querySelector('.profile__add-button');




function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJobe.textContent;
  popup.classList.add('popup_opened');
};

function closeEditPopup() {
  popup.classList.remove('popup_opened');
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJobe.textContent = jobInput.value;
    closeEditPopup();
};

// -----------------------------------------------------------------------------------------
let cardPopup = document.querySelector('#popup-card');
let closeAddButton = cardPopup.querySelector('.popup__close-button')

let element = document.querySelector('.elements')

let cardTemplate = document.querySelector('#cardBlock').content;
let cardElement = cardTemplate.querySelector('.element').cloneNode(true);
// let cardElement = cardTemplate.cloneNode(true);
let cardImage = cardElement.querySelector('.element__image');
let cardTitle = cardElement.querySelector('.element__title');
let cardInputImage = cardPopup.querySelector('.element__input_type_img');
let cardInputTitle = cardPopup.querySelector('.element__input_type_title');

let cardFormPopup = cardPopup.querySelector('.popup__form');



function newCard() {
  cardPopup.classList.add('popup_opened');
}

function closeAddPopup () {
  cardPopup.classList.remove('popup_opened')
};

function cardSubmitHandler (evt) {
  evt.preventDefault();

  cardImage.src = cardInputImage.value;
  cardTitle.textContent = cardInputTitle.value;

  element.prepend(cardElement);


  closeAddPopup();

};




editButton.addEventListener('click', openEditPopup);
closePopup.addEventListener('click', closeEditPopup);
formElement.addEventListener('submit', formSubmitHandler);

buttonAdd.addEventListener('click', newCard);
closeAddButton.addEventListener('click' , closeAddPopup);
cardFormPopup.addEventListener('submit', cardSubmitHandler);
