export class FormValidator {
  constructor(properties, formElement) {
    this._formElement = formElement
    this._inactiveButtonClass = properties.inactiveButtonClass;
    this._inputErrorClass = properties.inputErrorClass;
    this._errorClass = properties.errorClass;
    this._patternErrorSelector = properties.patternErrorSelector;
    this._inputList = Array.from(formElement.querySelectorAll(properties.inputSelector));
    this._buttonSubmit = formElement.querySelector(properties.submitButtonSelector);
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
    const errorField = formElement.querySelector(`${this._patternErrorSelector + inputField.id}`);
    /** Enable CSS for current <input>*/
    inputField.classList.add(this._inputErrorClass);
    /** Show error text*/
    errorField.classList.add(this._errorClass);
    /** Insert current error text*/
    errorField.textContent = validationMessage;
  };

  /**
   * Hide text error in <span> and activate style visualise CSS error for <input>
   *  *   @param formElement
   *  *   @param inputField - current field <input>
   *  *   {
   *  *     @const inputErrorClass,
   *  *     @const errorClass
   *  *   }
   *  * */
  _hideInputError(formElement, inputField) {
    const errorField = formElement.querySelector(`${this._patternErrorSelector + inputField.id}`);
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

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  /**
   * Css class switcher enable\disable for the button submit
   * */
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      /** Disable button*/
      this._buttonSubmit.classList.add(this._inactiveButtonClass);
      this._buttonSubmit.disabled = true;
    } else {
      /** Enable button*/
      this._buttonSubmit.classList.remove(this._inactiveButtonClass);
      this._buttonSubmit.disabled = false;
    }
  };

  /**
   * Set eventListener for each <input> line
   * */
  _setEventListeners() {
    this._toggleButtonState();
    /** Listener for deactivate submit button form after send form*/
    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState();
      }, 0);
    });
    this._inputList.forEach(inputField => {
      inputField.addEventListener("input", () => {
        /** Realtime check validation input*/
        this._checkInputValidity(this._formElement, inputField);
        this._toggleButtonState();
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












