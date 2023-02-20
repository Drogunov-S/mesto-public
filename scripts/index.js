/* ----------------------------- Imports -----------------------------*/
import {initialCards} from "./cards.js";
import {FormValidator} from "./validate.js";
import {Card} from "./card.js";
import {propertiesCard, propertiesValidator} from "./properties.js";

/* ----------------------------- Constant -----------------------------*/
const popupOpened = 'popup_opened';
const btnClosePopup = 'popup__close';
const eventClick = 'click';
const eventSubmit = 'submit';
const nodes = initialCards.map(cardInfo => renderCard(cardInfo.name, cardInfo.link));

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

/* ----------------------------- Enable validation -----------------------------*/

new FormValidator(propertiesValidator, document.profileForm).enableValidation();
new FormValidator(propertiesValidator, document.formNewPost).enableValidation();

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
  clearInputs(popup);
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
function clearInputs(popup) {
  const isForm = popup.querySelector(formSelector);
  if (isForm) {
    isForm.reset();
  }
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
export function showPreviewPopup(urlImage, caption) {
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

  const renderedCards = renderCard(inputPostTitle.value, inputPostImageUrl.value,)
  insertCard(renderedCards);
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

/* ----------------------------- Default listeners -----------------------------*/

document
    .querySelector('.profile__edit-btn')
    .addEventListener(eventClick, () => insertDataProfile(popupEditProfile));
document
    .querySelector('.profile__add-btm')
    .addEventListener(eventClick, () => openPopup(popupAddPost));
const formSelector = ".data-form__form";
popupEditProfile.querySelector(formSelector)
    .addEventListener(eventSubmit, handleProfileFormSubmit)
popupAddPost
    .querySelector(formSelector)
    .addEventListener(eventSubmit, insertPostOnSite);

/* ----------------------------- Инициализация default card -----------------------------*/

function renderCard(name, link) {
  return new Card(
      propertiesCard
      , name
      , link
      , '#card-template')
      .renderCard()
}
