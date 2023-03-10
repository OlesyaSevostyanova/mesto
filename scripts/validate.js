// Валидация форм

const showInputError = (inputElement, errorMessageElement, errorMessage, validationConfig) => {
  inputElement.classList.add(validationConfig.inputErrorModifierClassSelector);
  errorMessageElement.textContent = errorMessage;
  errorMessageElement.classList.add(validationConfig.errorMessageActiveModifierClass);
};

const hideInputError = (inputElement, errorMessageElement, validationConfig) => {
  inputElement.classList.remove(validationConfig.inputErrorModifierClassSelector);
  errorMessageElement.classList.remove(validationConfig.errorMessageActiveModifierClass);
  errorMessageElement.textContent = '';
};

const checkInputValidity = (inputElement, errorMessageElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorMessageElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(inputElement, errorMessageElement, validationConfig);
  }
};

const setFormInputEventListeners = (formFieldsList, buttonElement, formElement, validationConfig) => {
  formFieldsList.forEach(formField => {
    const inputElement = formField.querySelector(validationConfig.inputClassSelector);
    const errorMessageElement = formField.querySelector(validationConfig.errorMessageClassSelector);

    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement, errorMessageElement, validationConfig);
      toggleButtonState(formElement, buttonElement, validationConfig);
    });
  });
};

const hasInvalidInput = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputClassSelector));

  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (formElement, buttonElement, validationConfig) => {
  if (hasInvalidInput(formElement)) {
    buttonElement.classList.add(validationConfig.submitButtonDisabledModifierClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.submitButtonDisabledModifierClass);
    buttonElement.disabled = false;
  }
}

const enableValidation = validationConfig => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formClassSelector));
  formList.forEach(formElement => {
    const buttonElement = formElement.querySelector(validationConfig.submitButtonClassSelector);
    const formFieldsList = Array.from(formElement.querySelectorAll(validationConfig.formFieldClassSelector));
    setFormInputEventListeners(formFieldsList, buttonElement, formElement, validationConfig);
  });
};
