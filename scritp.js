let content = document.querySelector('.content');
let profile = content.querySelector('.profile');
let editButton = content.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close-button');


function openProfile() {
  popup.classList.add('popup_opened');
  popup.classList.remove('popup');
};

function closeProfile() {
  popup.classList.add('popup');
  popup.classList.remove('popup_opened');
};

editButton.addEventListener('click', openProfile);
closePopup.addEventListener('click', closeProfile);


// Находим форму в DOM
let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__form-name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__form-job'); // Воспользуйтесь инструментом .querySelector()
let profileName = document.querySelector('.profile__name');
let profileJobe = document.querySelector('.profile__job');




function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJobe.textContent = jobInput.value;
    closeProfile();
};
formElement.addEventListener('submit', formSubmitHandler);
