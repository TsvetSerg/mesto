export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup
  }

  open() {
    this._selectorPopup.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._selectorPopup.classList.remove('popup_opened');
    this._removeEventListeners();
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose());
    document.addEventListener('click', this._handleClickOver());
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose());
    document.removeEventListener('click', this._handleClickOver());
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickOver(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
      }
  }
}
