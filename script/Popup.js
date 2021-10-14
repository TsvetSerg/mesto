export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup
    this._handelEsc = this._handleEscClose.bind(this)
    this._closeBtn = this._selectorPopup.querySelector('.popup__close-button');
  }

  open() {
    this._selectorPopup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handelEsc)
  }

  close() {
    this._selectorPopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handelEsc)

  }

  // setEventListeners() {
  //   document.addEventListener('keydown', this._handlerEscape);
  //   document.addEventListener('click', this._handleClick);
  //   document.addEventListener('click', this._handleClickBtn)
  // }

  // _removeEventListeners() {
  //   document.removeEventListener('keydown', this._handlerEscape);
  //   document.removeEventListener('click', this._handleClick);
  // }


  _handleEscClose(evt) {
    if (evt && evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._selectorPopup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    })
    this._closeBtn.addEventListener('click', () => {
      this.close();
    })

  // _handlerEscape = (evt) => {this._handleEscClose(evt, this)}
  // _handleClick = (evt) => {this._handleClickOver(evt, this)}
 }
}
