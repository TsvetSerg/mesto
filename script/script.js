let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_name');
let jobInput = formElement.querySelector('.popup__input_job');
let profileName = document.querySelector('.profile__name');
let profileJobe = document.querySelector('.profile__job');

function openEditPopup() {
  nameInput.value = profileName.textContent; //
  jobInput.value = profileJobe.textContent; // Если я правильно понял то так, по крайней мере так показывает)
  popup.classList.add('popup_opened');
};

function closeEditPopup() {   // имя closePopup нельзя использовать тк оно задейственно в переменной, поэтому closeEditPopup
  popup.classList.remove('popup_opened');
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJobe.textContent = jobInput.value;
    closeEditPopup();
};


editButton.addEventListener('click', openEditPopup);
closePopup.addEventListener('click', closeEditPopup);
formElement.addEventListener('submit', formSubmitHandler);
