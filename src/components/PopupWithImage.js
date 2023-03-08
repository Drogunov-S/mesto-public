import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector, {popupCardImage, popupCardCaption}) {
    super(popupSelector);
    this._image = this._popup.querySelector(popupCardImage);
    this._previewCaption = this._popup.querySelector(popupCardCaption);
  }

  open(link, name) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._previewCaption.textContent = name;
  }
}
