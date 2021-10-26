// import {openPopup} from "./utils.js"



export default class Card {
  constructor({data, handlerCardClick, cardDeletClick}, cardSelector, canDel) {
    this._link = data.link
    this._name = data.name
    this._cardSelector = cardSelector
    this._handlerCardClick = handlerCardClick
    this._canDel = canDel
    this._id = data._id
    this._cardDeletClick = cardDeletClick
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._likeCard()
    })
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      // this._element.remove();
      this._cardDeletClick()
    })
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleImageClick();
    });
  }

  _likeCard() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _handleImageClick() {
    this._handlerCardClick({
      src: this._element.querySelector('.element__image').src,
      title: this._element.querySelector('.element__image').title
    })
  }


  _getTemplate() {            // метод клонирования template элемента
    const elementData = document
    .querySelector(this._cardSelector)
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
    this._element.querySelector('.element__image').alt = this._name;

    return this._element;
  }
}
