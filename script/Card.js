export default class Card {
  constructor(link, name) {
    this._link = link
    this._name = name
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._cardBottomLike()
    })
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._element.remove();
    })
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openPopupCard()
    });
  }

  _cardBottomLike() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _openPopupCard(item) {
    item.classList.add('popup_opened');
    document.querySelector('.popup__modal-title').textContent = this._name;
    document.querySelector('.popup__modal-image').src = this._link;
    document.querySelector('.popup__modal-image').alt = this._name;
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
