export class Card {
  constructor(
      properties,
      {link, name, _id, likes, owner},
      idTemplate,
      handlePopupImage, handlerPopupConfirmation,
      deleteCallback, toggleLikeCallback,
      ownerId
  ) {
    this._link = link;
    this._id = _id;
    this._likes = likes;
    this.isLike = this._likes.some(liker => liker['_id'] === ownerId);
    this._isOwner = owner._id === ownerId;
    this._name = name;
    this._idTemplate = idTemplate;
    this._eventClick = 'click';
    this._cardSelector = properties.cardSelector;
    this._cardImageSelector = properties.cardImageSelector;
    this._cardLikeSelector = properties.cardLikeSelector;
    this._cardCaptionSelector = properties.cardCaptionSelector;
    this._btnTrashSelector = properties.btnTrashSelector;
    this._activeLikeClass = properties.activeLikeClass;
    this._counterLikesSelector = properties.counterLikesSelector;
    this._btnTrashActiveClass = properties.btnTrashActiveClass;
    this._handlePopupImage = handlePopupImage;
    this._handlerPopupConfirmation = handlerPopupConfirmation;
    this._deleteCallBack = deleteCallback;
    this._toggleLikeCallback = toggleLikeCallback
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
    if (this.isLike) {
      this._likeElement.classList.add(this._activeLikeClass)
    }
    this._counterLikes = this._newCard.querySelector(this._counterLikesSelector);
    this._counterLikes.textContent = this._likes.length;
    this._setEventListeners()
    this._ownerSettings();
    return this._newCard;
  }

  _ownerSettings() {
    if (this._isOwner) {
      const trashBtm = this._newCard.querySelector(this._btnTrashSelector);
      trashBtm.classList.add(this._btnTrashActiveClass);
      trashBtm.disabled = false;
      trashBtm.addEventListener(this._eventClick, this._acceptDelete.bind(this));
    }
  }

  getId() {
    return this._id;
  }

  _acceptDelete() {
    this._handlerPopupConfirmation(() => this._deleteCallBack(this));
  }


  _setEventListeners() {
    this._imageElement.addEventListener(this._eventClick, () => this._handlePopupImage(this._link, this._name));
    this._likeElement.addEventListener(this._eventClick, () => this._toggleLikeCallback(this));
  }

  _getTemplate() {
    return document.querySelector(this._idTemplate)
        .content
        .querySelector(this._cardSelector)
        .cloneNode(true)
  }

  /**
   * Enable \ disable like on site
   * */
  _toggleLike() {
    this.isLike
        ? this._activeLike()
        : this._disableLike();
  }

  _activeLike() {
    this._likeElement.classList.add(this._activeLikeClass);
  }

  _disableLike() {
    this._likeElement.classList.remove(this._activeLikeClass);
  }

  update({likes}, isLike) {
    this.isLike = isLike;
    this._likes = likes;
    this._counterLikes.textContent = likes.length;
    this._toggleLike();
  }

  trashCard() {
    this._newCard.remove();
  }
}
