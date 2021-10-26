import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(selectorPopup, {submitCallBack}) {
    super(selectorPopup)
    this._submitCallBack = submitCallBack
  }

  open(cardId) {
    super.open();
    this._id = cardId
  }

  id() {
    return this._id
  }


  setEventListeners() {
    super.setEventListeners();
    this._selectorPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallBack();
    })
  }

}
