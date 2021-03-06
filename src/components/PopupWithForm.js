import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(selectorPopup, {submitCallBack}) {
  super(selectorPopup)
  this._submitCallBack = submitCallBack;
  this._form = this._selectorPopup.querySelector('.popup__form');
  this._inputs = this._selectorPopup.querySelectorAll('.popup__input');
  this._submitButton = this._selectorPopup.querySelectorAll('.popup__button');
  }

  loadSubmit() {
    this._submitButton.textContent = 'Сохранение...'
  }

  reset() {
    this._form.reset();
  }

  _getInputValues() {
    this._itemValue = {}; // результат сбора данных = объект
    this._inputs.forEach((input) => {
      this._itemValue[input.name] = input.value;
    });
    return this._itemValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._submitCallBack(this._getInputValues());
    })
  }

  close() {
    super.close();
  }

}
