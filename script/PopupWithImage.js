import Popup from "./Popup";
class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._modalImages = this._selectorPopup.querySelector('.popup__modal-image');
    this._modalTitle = this._selectorPopup.querySelector('.popup__modal-title');
  }

  open(item) {
    super.open()
    this._modalImages.src = item.link;
    this._modalImages.alt = item.name;
    this._modalTitle.textContent = item.name;
  }
}
