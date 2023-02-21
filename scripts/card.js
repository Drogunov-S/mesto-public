export class Card {
  constructor(properties, name, link, idTemplate) {
    this._name = name;
    this._link = link;
    this._idTemplate = idTemplate;
    this._eventClick = 'click';
    this._cardSelector = properties.cardSelector;
    this._cardImageSelector = properties.cardImageSelector;
    this._cardLikeSelector = properties.cardLikeSelector;
    this._cardCaptionSelector = properties.cardCaptionSelector;
    this._btnTrashSelector = properties.btnTrashSelector;
    this._activeLikeClass = properties.activeLikeClass;
    this._showPreviewPopup = properties.showPreviewPopup;
  }

  /**
   * Creator new card from template
   * */
  renderCard() {
    this._newCard = this._getTemplate();
    this._imageElement = this._newCard.querySelector(this._cardImageSelector);
    this._imageElement.src = this._link;
    this._imageElement.alt = `Изображение ${this._name}`;
    const imageCaption = this._newCard.querySelector(this._cardCaptionSelector);
    imageCaption.textContent = this._name;
    this._likeElement = this._newCard.querySelector(this._cardLikeSelector);
    this._setEventListeners()
    return this._newCard;
  }

  _setEventListeners() {
    this._imageElement.addEventListener(this._eventClick, () => this._showPreviewPopup(this._link, this._name));
    this._likeElement.addEventListener(this._eventClick, () => this._toggleLike(this._activeLikeClass))
    this._newCard.querySelector(this._btnTrashSelector)
        .addEventListener(this._eventClick, () => this._trashCard(this._cardSelector));
  }


  _getTemplate() {
    return document.querySelector(this._idTemplate)
        .content
        .querySelector(this._cardSelector)
        .cloneNode(true)
  }

  /**
   * Enable \ disable like on site
   * @param activeLikeClass
   * */
  _toggleLike(activeLikeClass) {
    this._likeElement
        .classList
        .toggle(activeLikeClass);
  }

  /**
   * Trash card
   * @param cardSelector
   * */
  _trashCard(cardSelector) {
    this._newCard
        .remove();
  }
}
