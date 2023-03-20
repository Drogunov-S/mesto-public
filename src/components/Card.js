export class Card {
  constructor(properties, data, idTemplate, handleCardClick, handlerTrashClick, deleteCallback, likeCallback, unlikeCallback, ownerId) {
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._isLike = this._likes.some(liker => liker['_id'] === ownerId);
    this._isOwner = data.owner._id === ownerId;
    this._name = data.name;
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
    this._handleCardClick = handleCardClick;
    this._handlerTrashClick = handlerTrashClick;
    this._deleteCallBack = deleteCallback;
    this._likeCallback = likeCallback;
    this._unlikeCallback = unlikeCallback;
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
    if (this._isLike) {
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
      trashBtm.addEventListener(this._eventClick, () => this._handlerTrashClick(this.trashCard.bind(this)));
    }
  }


  _setEventListeners() {
    this._imageElement.addEventListener(this._eventClick, () => this._handleCardClick(this._link, this._name));
    this._likeElement.addEventListener(this._eventClick, () => this._toggleLike(this._activeLikeClass))
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
    this._isLike
        ? this._disableLike()
        : this._activeLike();
  }

  _activeLike() {
    this._likeElement.classList.add(this._activeLikeClass);
    this._updateCard(this._likeCallback(this._id));
    this._isLike = true;
  }

  _disableLike() {
    this._likeElement.classList.remove(this._activeLikeClass);
    this._updateCard(this._unlikeCallback(this._id));
    this._isLike = false;
  }

  _updateCard(callback) {
    callback.then(card => {
      this._likes = card.likes;
      this._counterLikes.textContent = this._likes.length;
    })
  }

  /**
   * Trash card
   * */
  trashCard() {
    this._deleteCallBack(this._id);
    this._newCard.remove();
  }
}
