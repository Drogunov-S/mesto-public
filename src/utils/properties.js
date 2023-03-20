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
  counterLikesSelector: '.card__like-counter',
  btnTrashActiveClass: 'card__btn_type_trash_active'
}

const propertiesPopupWithImage = {
  popupSelector: '.popup-image',
  popupCardImage: '.preview__image',
  popupCardCaption: '.preview__caption'
}

const propertiesPopupWithConfirmation = {
  popupSelector: '.popup-confirmation'
}

const propertiesApi = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: '68ff74c2-9ffa-4750-b60b-83127c7e3981',
    'Content-Type': 'application/json'
  }
}

export {
  propertiesCard,
  propertiesValidator,
  propertiesPopupWithImage,
  propertiesPopupWithConfirmation,
  propertiesApi
}
