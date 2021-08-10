let content = document.querySelector('.content');
let profile = content.querySelector('.profile');
let editButton = content.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');


function editProf() {
  console.log('ok');
  popup.classList.add('popup_opened');
  popup.classList.remove('popup');
};

// editButton.hasEventListener('click');
editButton.addEventListener('click', editProf);
// editProf();
