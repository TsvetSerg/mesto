export default class FormValidator {
  constructor(formElement, config) {
    this._formElement = formElement
    this._config = config
  };

  enableValidation() {
    this._setEventListeners(
      this._formElement,
      this._config.inputSelector,
      this._config.submitButtonSelector,
      this._config.inputErrorClass,
      this._config.errorClass,
      this._config.inactiveButtonClass);
  };

  _setEventListeners(formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass) {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidation(inputElement, inputErrorClass, formElement, errorClass);
        this._toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
      });
    });

    if (this._hasNotInputValues(inputList)) {
      this._toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
    }

  };

  // функция включения ошибок
  _showInputError(inputElement, inputErrorClass, errorElement, errorClass) {

    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
  };

  _hideInputError (inputElement, inputErrorClass, errorElement, errorClass) {
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  };

  /// функция проверки валид
  _checkInputValidation (inputElement, inputErrorClass, formElement, errorClass) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputErrorClass, errorElement, errorClass);
    } else {
      this._hideInputError(inputElement, inputErrorClass, errorElement, errorClass);
    }
  };

  /// функции вкл\выкл кнопки
  _disableSumbitBatton (buttonElement, inactiveButtonClass) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');

  };

  _enableSumbitBatton (buttonElement, inactiveButtonClass) {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };

  _hasNotInputValues (inputList) {
    return inputList.every((inputElement) => {
      return inputElement.value.length === 0;
    });
  };


  /// изменение стиля кнопки
  _toggleButtonState (formElement, inputList, submitButtonSelector, inactiveButtonClass) {
    const buttonElement = formElement.querySelector(submitButtonSelector);

    if (this._hasInvalidInput(inputList) || this._hasNotInputValues(inputList)) {

      this._disableSumbitBatton(buttonElement, inactiveButtonClass);
    } else {
      this._enableSumbitBatton(buttonElement, inactiveButtonClass);
    }
  };

  /// функция поиска не валидной строки

  _hasInvalidInput (inputList) {
    return inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  };

}
