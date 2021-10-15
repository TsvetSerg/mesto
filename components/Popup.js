export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup
    this._handelEsc = this._handleEscClose.bind(this)
    this._closeBtn = this._selectorPopup.querySelector('.popup__close-button')
  }

  open() {
    this._selectorPopup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handelEsc)
  }

  close() {
    this._selectorPopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handelEsc)
  }

  _handleEscClose(evt) {
    if (evt && evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    })
    this._closeBtn.addEventListener('click', () => {
      this.close();
    })

  }

}
