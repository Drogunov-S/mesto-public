export class FormValidator {
  constructor(properties, formElement) {
    this._formElement = formElement
    // this._formSelector = properties.formSelector;
    this._inputSelector = properties.inputSelector;
    this._submitButtonSelector = properties.submitButtonSelector;
    this._inactiveButtonClass = properties.inactiveButtonClass;
    this._inputErrorClass = properties.inputErrorClass;
    this._errorClass = properties.errorClass;
  }


  /**
   * Shows text error in <span> and activate style visualise CSS error for <input>
   *   @param formElement - <form>
   *   @param inputField - current field <input>
   *   @param validationMessage - standard browser error message
   *   {
   *     @const inputErrorClass,
   *     @const errorClass
   *   }
   * */
  _showInputError(formElement, inputField, validationMessage) {
    /** Select current <span> error block for id*/
    const errorField = formElement.querySelector(`.data-form__input-error_type_${inputField.id}`);
    /** Enable CSS for current <input>*/
    inputField.classList.add(this._inputErrorClass);
    /** Show error text*/
    errorField.classList.add(this._errorClass);
    /** Insert current error text*/
    errorField.textContent = validationMessage;
  };

  /**
   * Hide text error in <span> and activate style visualise CSS error for <input>
   * *   @param formElement - <form>
   *  *   @param inputField - current field <input>
   *  *   {
   *  *     @const inputErrorClass,
   *  *     @const errorClass
   *  *   }
   *  * */
  _hideInputError(formElement, inputField) {
    const errorField = formElement.querySelector(`.data-form__input-error_type_${inputField.id}`);
    inputField.classList.remove(this._inputErrorClass);
    errorField.classList.remove(this._errorClass);
    errorField.textContent = '';
  };

  /**
   * Show or hide message with error on UI
   * @param formElement - <form>
   * @param inputField - current field <input>
   * */
  _checkInputValidity(formElement, inputField) {
    if (!inputField.validity.valid) {
      this._showInputError(formElement, inputField, inputField.validationMessage);
    } else {
      this._hideInputError(formElement, inputField);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  /**
   * Css class switcher enable\disable for the button submit
   * @param inputList - list <input(s)>
   * @param buttonSubmit - object with submit button
   * */
  _toggleButtonState(inputList, buttonSubmit) {
    if (this._hasInvalidInput(inputList)) {
      /** Disable button*/
      buttonSubmit.classList.add(this._inactiveButtonClass);
      buttonSubmit.disabled = true;
    } else {
      /** Enable button*/
      buttonSubmit.classList.remove(this._inactiveButtonClass);
      buttonSubmit.disabled = false;
    }
  };

  /**
   * Set eventListener for each <input> line
   *  @param formElement - <form>
   * */
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonSubmit = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonSubmit);
    /** Listener for deactivate submit button form after send form*/
    formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState(inputList, buttonSubmit);
      }, 0);
    });
    inputList.forEach(inputField => {
      inputField.addEventListener("input", () => {
        /** Realtime check validation input*/
        this._checkInputValidity(formElement, inputField);
        this._toggleButtonState(inputList, buttonSubmit);
      })
    })
  }

  /**
   * Enable validations for forms
   * */
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners(this._formElement);
  }

}












