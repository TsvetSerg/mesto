
export default class Card {
  constructor({data, handlerCardClick, cardDeletClick, handelLikeClick, handleDelLike}, cardSelector, userId) {
    this._link = data.link
    this._name = data.name
    this._cardSelector = cardSelector
    this._handlerCardClick = handlerCardClick
    this._cardDeletClick = cardDeletClick
    this._owner = data.owner._id
    this._id = data._id
    this._userId = userId
    this._likes = data.likes
    this._handelLikeClick = handelLikeClick
    this._handleDelLike = handleDelLike
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      if (this._likeBtn.classList.contains('element__like_active')) {      // Я понимаю что это прям костыли дикие, но умней чем сделать тут проверку не придумал
      this._handleDelLike(this._id)                                       // Можно было конечно сделать метооды типа тру или фолс, но мне кажется так понятней будет, надеюсь подойдет такой варитант))))
    } else {
      this._handelLikeClick(this._id)
    }
    })
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._cardDeletClick(this._id, this)
    })
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleImageClick();
    });
  }

  likeCard(res) {
    if (this._likeBtn.classList.contains('element__like_active')) {
        this._likeBtn.classList.remove('element__like_active')
        this._likeNum.textContent = res.likes.length
    } else {
        this._likeBtn.classList.add('element__like_active')
        this._likeNum.textContent = res.likes.length
    }
  }

  removeCard() {
    this._element.remove()
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

    this._dltBtn = this._element.querySelector('.element__delete');
    if (!(this._owner === this._userId)) {
      this._dltBtn.classList.add('element_dalete_remove')
    }

    this._likeBtn = this._element.querySelector('.element__like');
    if (this._likes.find(card => this._userId === card._id)) {
      this._likeBtn.classList.add('element__like_active')
    }

    this._likeNum = this._element.querySelector('.element__liked_num');
    this._likeNum.textContent = this._likes.length


    return this._element;
  }
}
