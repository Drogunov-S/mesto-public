import {Popup} from "./Popup";

const submitEvent = 'submit';

const fieldName = 'id';

export class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._inputs = Array.from(this._popup.querySelectorAll('input'));
    this._form = this._popup.querySelector('form');
  }

  getInputValues() {
    return this._inputs.reduce((data, input) => {
      data[input[fieldName]] = input.value;
      return data;
    }, {})
  }

  setEventsListener() {
    super.setEventsListener();
    this._popup.addEventListener(submitEvent, this._callbackSubmit);
  }

  _removeEventsListener() {
    super._removeEventsListener();
    this._popup.removeEventListener(submitEvent, this._callbackSubmit);
  }

  setDefaultValue(data) {
    this._inputs.forEach((input) => {
      if (data[input[fieldName]]) {
        input.value = data[input[fieldName]];
      }
    });
  }

  close() {
    super.close();
    this._clearForm();
  }

  _clearForm() {
    this._form.reset();
  }
}
