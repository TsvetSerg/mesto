import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(selectorPopup, {submitCallBack}, canDel, _id) {
    super(selectorPopup)
    this._submitCallBack = submitCallBack
    this._deletButton = this._selectorPopup.querySelector('.popup__button')
    this._canDel = canDel
    this._id = _id

  }

  open(cardId, cardElement) {
    super.open();
    this._cardElement = cardElement
    this._id = cardId
  }

  id() {
    return this._id
  }

  setEventListeners() {
    super.setEventListeners();
    this._selectorPopup.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._submitCallBack(this._id, this._cardElement);

    })
  }

}
