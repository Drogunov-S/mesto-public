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

//Открытие попап
function openPopup(popup) {
  popup.classList.add(popupOpened);
}

//Закрытие попап
function closePopup(popup) {
  popup.classList.remove(popupOpened);
}

//Очистка inputs
function clearingInputs(popup) {
  popup.querySelectorAll('.data-form__input')
      .reset();
}

//Добавление данных в input popup profile
function insertDataProfile() {
  inputFullname.value = profileFullname.textContent;
  inputPosition.value = profilePosition.textContent;
  openPopup(popupEditProfile);
}

//Добавление поста на сайт
function insertPostOnSite(evt) {
  evt.preventDefault();
  const card = {
    name: inputPostTitle.value,
    link: inputPostImageUrl.value
  }
  const renderedCards = renderCard(card);
  insertCard(renderedCards);
  clearingInputs(popupAddPost);
  closePopup(popupAddPost);
}

//Изменение данных в profile на сайте данными из формы
function showProfileData(evt) {
  evt.preventDefault();
  profileFullname.textContent = inputFullname.value;
  profilePosition.textContent = inputPosition.value;
  closePopup(popupEditProfile);
}

//popup preview image
function editPreviewPopup(urlImage, caption) {
  image.src = urlImage;
  image.alt = caption;
  previewCaption.textContent = caption;
  openPopup(popupImage);
}

/* ----------------------------- card -----------------------------*/

function renderCard(card) {
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

function insertCard(...cards) {
  cards.forEach(card =>
      cardsContainer.prepend(card));
}

function toggleLike(evt) {
  evt
      .target
      .classList
      .toggle('card__like_active');
}

function trashCard(evt) {
  evt
      .target
      .closest('.card')
      .remove();
}
