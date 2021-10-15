import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(selectorPopup, {submitCallBack}) {
  super(selectorPopup)
  this._submitCallBack = submitCallBack;
  this._form = this._selectorPopup.querySelector('.popup__form');
  this._input = this._selectorPopup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._itemValue = {}; // результат сбора данных = объект
    this._input.forEach((input) => {
      this._itemValue[input.name] = input.value;
    });
    return this._itemValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._selectorPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallBack(this._getInputValues());
      this.close();
    })
  }

  close() {
    super.close();
    this._form.reset()
  }

}
