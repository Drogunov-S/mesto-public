const propertiesValidator = {
  inputSelector: '.data-form__input',
  submitButtonSelector: '.data-form__btn-save',
  inactiveButtonClass: 'data-form__btn_disabled',
  inputErrorClass: 'data-form__input_error_active',
  errorClass: 'data-form__input-error_visible',
  patternErrorSelector: '.data-form__input-error_type_',
}

const propertiesCard = {
  cardSelector: '.card',
  cardImageSelector: '.card__image',
  cardLikeSelector: '.card__like',
  cardCaptionSelector: '.card__caption',
  btnTrashSelector: '.card__btn_type_trash',
  activeLikeClass: 'card__like_active',
}

const propertiesPopupWithImage = {
  popupImageSelector: '.popup-image',
  popupCardImage: '.preview__image',
  popupCardCaption: '.preview__caption'
}


export {propertiesCard, propertiesValidator, propertiesPopupWithImage}
