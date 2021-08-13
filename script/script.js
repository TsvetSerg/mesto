let content = document.querySelector('.content');
let profile = content.querySelector('.profile');
let editButton = content.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__form-name');
let jobInput = formElement.querySelector('.popup__form-job');
let profileName = document.querySelector('.profile__name');
let profileJobe = document.querySelector('.profile__job');

function openProfile() {
  popup.classList.add('popup_opened');
  popup.classList.remove('popup');
};

function closeProfile() {
  popup.classList.add('popup');
  popup.classList.remove('popup_opened');
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJobe.textContent = jobInput.value;
    closeProfile();
};


editButton.addEventListener('click', openProfile);
closePopup.addEventListener('click', closeProfile);
formElement.addEventListener('submit', formSubmitHandler);
