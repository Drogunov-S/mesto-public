import {Popup} from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(properties) {
    super(properties.popupSelector);
    this._form = this._popup.querySelector('form');
  }

  open(callBackTrashCard) {
    super.open();
    this._callBackTrashCard = callBackTrashCard;
    this._setEventListeners();
  }

  _setEventsListener() {
    super._setEventsListener();
    this._popup.addEventListener('submit', this._handlerSubmitListener);
  }

  _removeEventsListener() {
    super._removeEventsListener();
    this._popup.removeEventListener('submit', this._handlerSubmitListener);
  }

  _handlerSubmitListener = (evt) => {
    evt.preventDefault();
    this._callBackTrashCard();
    this._close();
  };

}
