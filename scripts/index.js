const popupOpened = 'popup_opened';
const eventClick = 'click';
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
      popup.querySelector('.popup__close')
          .addEventListener(eventClick, () => closePopup(popup));
    });
popupEditProfile.querySelector('.data-form__btn-save')
    .addEventListener(eventClick, showProfileData)

popupAddPost
    .querySelector('.data-form__btn-save')
    .addEventListener(eventClick, formData);

/* ----------------------------- popups -----------------------------*/

//Открытие попап
function openPopup(popup) {
  return popup.classList.add(popupOpened);
}

//Закрытие попап
function closePopup(popup) {
  popup.classList.remove(popupOpened);
}

//Очистка inputs
function clearingInputs(popup) {
  popup.querySelectorAll('.data-form__input')
      .forEach(input => input.value = '');
}

//Добавление поста на сайт
function formData(evt) {
  evt.preventDefault();
  const card = {
    name: inputPostTitle.value,
    link: inputPostImageUrl.value
  }
  const renderedCards = renderCard(card);
  insertCard(...renderedCards);
  clearingInputs(popupAddPost);
  return closePopup(popupAddPost);
}

//Добавление данных в input popup profile
function insertDataProfile(popupEditProfile) {
  inputFullname.value = profileFullname.textContent;
  inputPosition.value = profilePosition.textContent;
  return openPopup(popupEditProfile);
}

//Изменение данных в profile на сайте данными из формы
function showProfileData(evt) {
  evt.preventDefault();
  profileFullname.textContent = inputFullname.value;
  profilePosition.textContent = inputPosition.value;
  clearingInputs(popupEditProfile);
  return closePopup(popupEditProfile);
}

//popup preview image
function editPreviewPopup(urlImage, caption) {
  image.src = urlImage;
  image.alt = caption;
  previewCaption.textContent = caption;
  openPopup(popupImage);
}

/* ----------------------------- card -----------------------------*/

function renderCard(...cards) {
  return cards.map(card => {
    const cloneCard = emptyCardElement.cloneNode(true);
    const image = cloneCard.querySelector('.card__image');
    image.src = card.link;
    image.alt = `Изображение ${card.name}`;
    image.addEventListener(eventClick, () => editPreviewPopup(card.link, card.name));
    const imageCaption = cloneCard.querySelector('.card__caption');
    imageCaption.textContent = card.name;
    cloneCard.querySelector('.card__like').addEventListener(eventClick, toggleLike);
    cloneCard.querySelector('.card__btn_type_trash').addEventListener(eventClick, trashCard);
    return cloneCard;
  });
}

function insertCard(...cards) {
  cards.forEach(card =>
      cardsContainer.prepend(card));
}

function toggleLike() {
  this.classList.toggle('card__like_active');
}

function trashCard(evt) {
  evt
      .target
      .closest('.card')
      .remove();
}