import Popup from "./Popup.js";
import Card from "./Card.js";
export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._modalImages = this._selectorPopup.querySelector('.popup__modal-image');
    this._modalTitle = this._selectorPopup.querySelector('.popup__modal-title');
  }

  open(src, title) {
    super.open()
    this._modalImages.src = src;
    this._modalImages.alt = title;
    this._modalTitle.textContent = title;
  }
}
