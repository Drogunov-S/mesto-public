import {initialCards} from "./cards.js";
import {FormValidator} from "./validate.js";
import {Card} from "./card.js";

/* ----------------------------- Constant -----------------------------*/

const popupOpened = 'popup_opened';
const btnClosePopup = 'popup__close';
const eventClick = 'click';
const eventSubmit = 'submit';

const profileFullname = document.querySelector('.profile__full-name');
const profilePosition = document.querySelector('.profile__position');
const popupEditProfile = document.querySelector('.popup-edit-profile');
const inputFullname = document.querySelector('.data-form__input_type_text-fullname')
const inputPosition = document.querySelector('.data-form__input_type_text-position')
const popupAddPost = document.querySelector('.popup-add-post');
const cardsContainer = document.querySelector('.cards');
const inputPostTitle = popupAddPost.querySelector(".data-form__input_type_post-title");
const inputPostImageUrl = popupAddPost.querySelector(".data-form__input_type_url");
const popupImage = document.querySelector('.popup-image');
const image = popupImage.querySelector('.preview__image');
const previewCaption = popupImage.querySelector('.preview__caption');

/* ----------------------------- Default listeners -----------------------------*/

document
    .querySelector('.profile__edit-btn')
    .addEventListener(eventClick, () => insertDataProfile(popupEditProfile));
document
    .querySelector('.profile__add-btm')
    .addEventListener(eventClick, () => openPopup(popupAddPost));
popupEditProfile.querySelector('.data-form__form')
    .addEventListener(eventSubmit, handleProfileFormSubmit)
popupAddPost
    .querySelector('.data-form__form')
    .addEventListener(eventSubmit, insertPostOnSite);

/* ----------------------------- Enable validation -----------------------------*/

const propertiesValidator = {
  inputSelector: '.data-form__input',
  submitButtonSelector: '.data-form__btn-save',
  inactiveButtonClass: 'data-form__btn_disabled',
  inputErrorClass: 'data-form__input_error_active',
  errorClass: 'data-form__input-error_visible'
}

new FormValidator(propertiesValidator, document.profileForm).enableValidation();
new FormValidator(propertiesValidator, document.formNewPost).enableValidation();

/* ----------------------------- Инициализация default card -----------------------------*/

const propertiesCard = {
  cardSelector: '.card',
  cardImageSelector: '.card__image',
  cardLikeSelector: '.card__like',
  cardCaptionSelector: '.card__caption',
  btnTrashSelector: '.card__btn_type_trash',
  showPreviewPopup: showPreviewPopup,
  activeLikeClass: 'card__like_active',
}

const nodes = initialCards.map(cardInfo => {
  return new Card(
      propertiesCard
      , cardInfo.name
      , cardInfo.link
      , '#card-template')
      .renderCard()
});

/* ----------------------------- popups -----------------------------*/

/**
 * Set closing popup events listeners
 * @param {MouseEvent} evt - event
 * */
const setPopupClosedListeners = (evt) => {
  const targetClasses = Array.from(evt.target.classList);
  const hasClose = targetClasses.some((currentClass) => {
    return currentClass === popupOpened
        || currentClass === btnClosePopup;
  })
  if (hasClose) {
    closePopup(evt.target.closest('.popup_opened'));
  }
}

/**
 * function opened popup
 * @param popup - object DOM popup
 * */
function openPopup(popup) {
  document.addEventListener('keydown', closeByEscape);
  popup.addEventListener('mousedown', setPopupClosedListeners);
  popup.classList.add(popupOpened);
}

/**
 * Close popup
 * @param popup - object DOM popup
 * */
function closePopup(popup) {
  popup.classList.remove(popupOpened);
  popup.removeEventListener('mousedown', setPopupClosedListeners);
  document.removeEventListener('keydown', closeByEscape);
}

/**
 * Close open popup press by Esc key
 * @param {KeyboardEvent} evt
 * */
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

/**
 * Clear inputs <form>
 * */
function clearInputs(evt) {
  evt.target.reset();
}

/* ----------------------------- Utils -----------------------------*/

/**
 * Added card(s) in cardsContainer on site
 * @param cards - array cards or single object card
 * */
function insertCard(...cards) {
  cards.forEach(card =>
      cardsContainer.prepend(card));
}

insertCard(...nodes)

/**
 * Show image card in
 * @param {String} urlImage - reference on image
 * @param {String} caption - text caption image
 * */
function showPreviewPopup(urlImage, caption) {
  image.src = urlImage;
  image.alt = caption;
  previewCaption.textContent = caption;
  openPopup(popupImage);
}

/**
 * Update data in profile on site.
 * @param {SubmitEvent} evt
 * */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileFullname.textContent = inputFullname.value;
  profilePosition.textContent = inputPosition.value;
  closePopup(popupEditProfile);
}

/**
 * Added new post on site
 * @param {SubmitEvent} evt
 * */
function insertPostOnSite(evt) {
  evt.preventDefault();

  const renderedCards = new Card(
      propertiesCard,
      inputPostTitle.value,
      inputPostImageUrl.value,
      '#card-template')
      .renderCard()

  insertCard(renderedCards);
  clearInputs(evt);
  closePopup(popupAddPost);
}

/**
 * Load data in <input>(s) line profile
 * */
function insertDataProfile(popupEditProfile) {
  inputFullname.value = profileFullname.textContent;
  inputPosition.value = profilePosition.textContent;
  openPopup(popupEditProfile);
}
