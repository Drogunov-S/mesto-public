import {Popup} from "./Popup";

const submitEvent = 'submit';
const fieldName = 'name';

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._inputs = Array.from(this._popup.querySelectorAll('input'));
    this._btnSubmit = this._popup.querySelector('.data-form__btn-save');
    this._form = this._popup.querySelector('form');
  }

  _getInputValues() {
    return this._inputs.reduce((data, input) => {
      data[input[fieldName]] = input.value;
      return data;
    }, {})
  }

  _handlerSubmitListener = (evt) => {
    evt.preventDefault();
    this._callbackSubmit(this._getInputValues());
    this._close();
  };

  _setEventsListener() {
    super._setEventsListener();
    this._popup.addEventListener(submitEvent, this._handlerSubmitListener);
  }

  _removeEventsListener() {
    super._removeEventsListener();
    this._popup.removeEventListener(submitEvent, this._handlerSubmitListener);
  }

  setDefaultValue(data) {
    this._inputs.forEach((input) => {
      if (data[input[fieldName]]) {
        input.value = data[input[fieldName]];
      }
    });
  }

  isLoadingData(isLoad, massage) {
    if (isLoad) {
          this._btnSubmit.textContent = massage;
    } else {
      this._btnSubmit.textContent = massage;
    }
  }

  _close() {
    super._close();
    this._clearForm();
  }

  _clearForm() {
    this._form.reset();
  }
}
