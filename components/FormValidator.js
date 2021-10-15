export default class FormValidator {
  constructor(formElement, config) {
    this._formElement = formElement
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  };

  enableValidation() {
    this._setEventListeners();
  };

  _setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidation(inputElement);
        this._toggleButtonState();
      });
    });

    if (this._hasNotInputValues()) {
      this._toggleButtonState();
    }

  };

  // функция включения ошибок
  _showInputError(inputElement, validationMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = validationMessage; ;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  };

  /// функция проверки валид
  _checkInputValidation (inputElement) {

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  resetValidation = () => {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });

  }


  /// функции вкл\выкл кнопки
  _disableSumbitBatton () {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', 'disabled');

  };

  _enableSumbitBatton () {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  };

  _hasNotInputValues () {
    return this._inputList.every((inputElement) => {
      return inputElement.value.length === 0;
    });
  };


  /// изменение стиля кнопки
  _toggleButtonState () {
    if (this._hasInvalidInput()) {

      this._disableSumbitBatton();
    } else {
      this._enableSumbitBatton();
    }
  };

  /// функция поиска не валидной строки

  _hasInvalidInput () {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  };

}
