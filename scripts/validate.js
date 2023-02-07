/**
 * Shows text error in <span> and activate style visualise CSS error for <input>
 *   @param formElement - <form>
 *   @param inputField - current field <input>
 *   @param validationMessage - standard browser error message
 *   @param property - properties with classed added
 *   {
 *     @const inputErrorClass,
 *     @const errorClass
 *   }
 * */
const showInputError = (formElement, inputField, validationMessage, property) => {
  /** Select current <span> error block for id*/
  const errorField = formElement.querySelector(`.data-form__input-error_type_${inputField.id}`);
  /** Enable CSS for current <input>*/
  inputField.classList.add(property.inputErrorClass);
  /** Show error text*/
  errorField.classList.add(property.errorClass);
  /** Insert current error text*/
  errorField.textContent = validationMessage;
};

/**
 * Hide text error in <span> and activate style visualise CSS error for <input>
 * *   @param formElement - <form>
 *  *   @param inputField - current field <input>
 *  *   @param property - properties with classed added
 *  *   {
 *  *     @const inputErrorClass,
 *  *     @const errorClass
 *  *   }
 *  * */
const hideInputError = (formElement, inputField, property) => {
  const errorField = formElement.querySelector(`.data-form__input-error_type_${inputField.id}`);
  inputField.classList.remove(property.inputErrorClass);
  errorField.classList.remove(property.errorClass);
  errorField.textContent = '';
};

/**
 * Show or hide message with error on UI
 * @param formElement - <form>
 * @param inputField - current field <input>
 * @param properties - with CSS classes for show\hide error
 * */
const checkInputValidity = (formElement, inputField, properties) => {
  if (!inputField.validity.valid) {
    showInputError(formElement, inputField, inputField.validationMessage, properties);
  } else {
    hideInputError(formElement, inputField, properties);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

/**
 * Css class switcher enable\disable for the button submit
 * @param inputList - list <input(s)>
 * @param buttonSubmit - object with submit button
 * @param properties - Object with class disabled button
 * */
const toggleButtonState = (inputList, buttonSubmit, properties) => {
  if (hasInvalidInput(inputList)) {
    /** Disable button*/
    buttonSubmit.classList.add(properties.inactiveButtonClass);
    buttonSubmit.disabled = true;
  } else {
    /** Enable button*/
    buttonSubmit.classList.remove(properties.inactiveButtonClass);
    buttonSubmit.disabled = false;
  }
};
/**
 * Set eventListener for each <input> line
 *  @param formElement - <form>
 *  @param properties - Object with stars properties
 * */
const setEventListeners = (formElement, properties) => {
  const inputList = Array.from(formElement.querySelectorAll(properties.inputSelector));
  const buttonSubmit = formElement.querySelector(properties.submitButtonSelector);
  toggleButtonState(inputList, buttonSubmit, properties);
  /** Listener for deactivate submit button form after send form*/
  formElement.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonSubmit, properties);
    }, 0);
  });
  inputList.forEach(inputField => {
    inputField.addEventListener("input", () => {
      /** Realtime check validation input*/
      checkInputValidity(formElement, inputField, properties);
      toggleButtonState(inputList, buttonSubmit, properties);
    })
  })
}

/**
 * Enable validations for forms
 * @param properties}
 * */
function enableValidation(properties) {
  const forms = Array.from(document.querySelectorAll(properties.formSelector));
  forms.forEach(form => {
    form.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(form, properties);
  });
}











