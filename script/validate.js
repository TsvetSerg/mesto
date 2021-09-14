const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach(formElement => {
    setEventListeners(
      formElement,
      config.inputSelector,
      config.submitButtonSelector,
      config.inputErrorClass,
      config.errorClass,
      config.inactiveButtonClass);

  });
};


const setEventListeners = (formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidation(inputElement, inputErrorClass, formElement, errorClass);
      toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
    });
  });

  if (hasNotInputValues(inputList)) {
    toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
  }

};

// функция включения ошибок
const showInputError = (inputElement, inputErrorClass, errorElement, errorClass) => {

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (inputElement, inputErrorClass, errorElement, errorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

/// функция проверки валид
const checkInputValidation = (inputElement, inputErrorClass, formElement, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputErrorClass, errorElement, errorClass);
  } else {
    hideInputError(inputElement, inputErrorClass, errorElement, errorClass);
  }
};

/// функции вкл\выкл кнопки
const disableSumbitBatton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
};

const enableSumbitBatton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
};

const hasNotInputValues = (inputList) => {
  return inputList.every((inputElement) => {
    return inputElement.value.length === 0;
  });
};


/// изменение стиля кнопки
const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
  const buttonElement = formElement.querySelector(submitButtonSelector);

  if (hasInvalidInput(inputList) || hasNotInputValues(inputList)) {

    disableSumbitBatton(buttonElement, inactiveButtonClass);
  } else {
    enableSumbitBatton(buttonElement, inactiveButtonClass);
  }
};

/// функция поиска не валидной строки

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

