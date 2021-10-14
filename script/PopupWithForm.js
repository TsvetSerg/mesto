import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(selectorPopup, submitCallBack) {
  super(selectorPopup)
  this._submitCallBack = submitCallBack;
  this._form = document.querySelector('.popup__form');
  this._input = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    const itemValue = {}; // результат сбора данных = объект
    this._input.forEach((input) => {
      itemValue[input.name] = input.value;
    });
    return itemValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallBack(this._getInputValues());
      this.close();
    })
  }

  close() {
    super.close();
    this._form.reset()
  }

  // open(user, job) {
  //   super.open()
  //   this._form.querySelector('.popup__input_type_name').value = user
  //   this._form.querySelector('.popup__input_type_job').value = job
  // }
}
