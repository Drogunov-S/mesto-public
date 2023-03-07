import {Popup} from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector, {popupImageSelector, popupCardImage, popupCardCaption}) {
    super(popupSelector);
    this._popupImage = document.querySelector(popupImageSelector);
    this._image = this._popupImage.querySelector(popupCardImage);
    this._previewCaption = this._popupImage.querySelector(popupCardCaption);
  }

  open(link, name) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._previewCaption.textContent = name;
  }
}
