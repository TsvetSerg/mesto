import {openPopup} from "./utils.js"

export default class Card {
  constructor(data) {
    this._link = data.link
    this._name = data.name
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._cardBottomLike()
    })
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._element.remove();
    })
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleImageClick()
    });
  }

  _cardBottomLike() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleImageClick() {         // Метод наполнение и открывания попапа с картинкой
    document.querySelector('.popup__modal-title').textContent = this._name;
    document.querySelector('.popup__modal-image').src = this._link;
    document.querySelector('.popup__modal-image').alt = this._name;
    openPopup(document.querySelector('.popup-card'));
  }


  _getTemplate() {            // метод клонирования template элемента
    const elementData = document
    .querySelector('.template-data')
    .content
    .querySelector('.element')
    .cloneNode(true);

    return elementData
  }

  generateCard() {        // Метод создания карточки из массива
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}
