import Popup from "./Popup";
class PopupWithForm extends Popup {
  constructor(selectorPopup, submitCallBack) {
  super(selectorPopup)
  this._submitCallBack = submitCallBack;
  }

  _getInputValues() {

  }

  setEventListeners() {
    super.setEventListeners();

  }
  close() {
    super.close();
    
  }
}
