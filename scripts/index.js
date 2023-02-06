const popupOpened = 'popup_opened';
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
const emptyCardElement = document
    .querySelector('#card-template')
    .content
    .querySelector('.card');

document
    .querySelector('.profile__edit-btn')
    .addEventListener(eventClick, () => insertDataProfile(popupEditProfile));
document
    .querySelector('.profile__add-btm')
    .addEventListener(eventClick, () => openPopup(popupAddPost));

document.querySelectorAll('.popup')
    .forEach(popup => {
      popup.querySelector('.popup__container')
          .addEventListener(eventClick, (evt) => evt.stopPropagation());
      popup.addEventListener(eventClick, () => {
        closePopup(popup);
      });
      document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
          closePopup(popup);
        }
      });
      popup.querySelector('.popup__close')
          .addEventListener(eventClick, () => closePopup(popup));
    });
popupEditProfile.querySelector('.data-form__form')
    .addEventListener(eventSubmit, showProfileData)
popupAddPost
    .querySelector('.data-form__form')
    .addEventListener(eventSubmit, insertPostOnSite);

//Инициализация default card
const nodes = initialCards.map(card => {
  return renderCard(card);
});
insertCard(...nodes)

/* ----------------------------- popups -----------------------------*/

/**
 * function opened popup
 * @param popup - object DOM popup
 * */
function openPopup(popup) {
  popup.classList.add(popupOpened);
}

/**
 * Close popup
 * @param popup - object DOM popup
 * */
function closePopup(popup) {
  popup.classList.remove(popupOpened);
}

/**
 * Clear inputs <form>
 *
 * */
function clearingInputs(evt) {
  evt
      .target
      .reset();
}

/**
 * Load data in <input>(s) line profile
 * */
function insertDataProfile() {
  inputFullname.value = profileFullname.textContent;
  inputPosition.value = profilePosition.textContent;
  openPopup(popupEditProfile);
}

/**
 * Added new post on site
 * @param {Event} evt
 * */
function insertPostOnSite(evt) {
  evt.preventDefault();
  const card = {
    name: inputPostTitle.value,
    link: inputPostImageUrl.value
  }
  const renderedCards = renderCard(card);
  insertCard(renderedCards);
  clearingInputs(evt);
  closePopup(popupAddPost);
}

/**
 * Update data in profile on site.
 * @param {Event} evt
 * */
function showProfileData(evt) {
  evt.preventDefault();
  profileFullname.textContent = inputFullname.value;
  profilePosition.textContent = inputPosition.value;
  closePopup(popupEditProfile);
}

/**
 * Show image card in
 * @param urlImage - reference on image
 * @param caption - text caption image
 * */
function editPreviewPopup(urlImage, caption) {
  image.src = urlImage;
  image.alt = caption;
  previewCaption.textContent = caption;
  openPopup(popupImage);
}

/* ----------------------------- card -----------------------------*/
/**
 * Creator new card from template
 * @param card - object card with line {String} name and {url} link
 * */
function renderCard(card) {
  /** Clone template from html*/
  const newCard = emptyCardElement.cloneNode(true);
  const image = newCard.querySelector('.card__image');
  image.src = card.link;
  image.alt = `Изображение ${card.name}`;
  image.addEventListener(eventClick, () => editPreviewPopup(card.link, card.name));
  const imageCaption = newCard.querySelector('.card__caption');
  imageCaption.textContent = card.name;
  const like = newCard.querySelector('.card__like');
  like.addEventListener(eventClick, toggleLike);
  newCard.querySelector('.card__btn_type_trash').addEventListener(eventClick, trashCard);
  return newCard;
}

/**
 * Added card(s) in cardsContainer on site
 * @param cards - array cards or single object card
 * */
function insertCard(...cards) {
  cards.forEach(card =>
      cardsContainer.prepend(card));
}

/**
 * Enable \ disable like on site
 * @param {Event} evt
 * */
function toggleLike(evt) {
  evt
      .target
      .classList
      .toggle('card__like_active');
}

/**
 * Trash card
 * @param {Event} evt
 * */
function trashCard(evt) {
  evt
      .target
      .closest('.card')
      .remove();
}

/* ----------------------------- Enable validation -----------------------------*/

enableValidation({
  formSelector: '.data-form__form ',
  inputSelector: '.data-form__input',
  submitButtonSelector: '.data-form__btn-save',
  inactiveButtonClass: 'data-form__btn_disabled',
  inputErrorClass: 'data-form__input_error_active',
  errorClass: 'data-form__input-error_visible'
});
