export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    // debugger
    this._popup.classList.add('popup_opened');
    this.setEventsListener();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._removeEventsListener();
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _standardClose = (evt) => {
    const targetClasses = Array.from(evt.target.classList);
    const hasClose = targetClasses.some((currentClass) => {
      return currentClass === 'popup_opened'
          || currentClass === 'popup__close';
    })
    if (hasClose) {
      this.close();
    }
  }

  setEventsListener() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('mousedown', this._standardClose);
  }

  _removeEventsListener() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._standardClose);
  }
}
