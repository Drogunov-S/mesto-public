const popupOpened = 'popup_opened';
const profileFullname = document.querySelector('.profile__full-name');
const profilePosition = document.querySelector('.profile__position');
const inputFullname = document.querySelector('.data-form__input_type_text-fullname')
const inputPosition = document.querySelector('.data-form__input_type_text-position')
const eventClick = 'click';


document
    .querySelector('.profile__edit-btn')
    .addEventListener(eventClick, openPopupEditProfile);
document
    .querySelector('.profile__add-btm')
    .addEventListener(eventClick, openPopupAddPost);

document.querySelectorAll('.popup__close')
    .forEach(closeButton => closeButton
        .addEventListener(eventClick, closePopup));

/* ----------------------------- popups -----------------------------*/
//Открытие попап
function openPopup(popup) {
  popup.classList.add(popupOpened);
}

//Закрытие попап
function closePopup(evt) {
  const popup = findOpenPopup(evt);
  popup.classList.remove(popupOpened);
}

//Поиск открытого попапа
function findOpenPopup(evt) {
  const findClass = 'popup';
  let popup = evt.target;
  while (!popup.classList.contains(findClass)) {
    popup = popup.parentElement;
  }
  return popup;
}

//popup newPost
function openPopupAddPost() {
  const addPost = document.querySelector('.popup-add-post');
  addPost.querySelector('.data-form__btn-save').addEventListener(eventClick, addedPostOnSite);
  openPopup(addPost);
}

//Добавление поста на сайт
function addedPostOnSite(evt) {
  evt.preventDefault();
  const form = evt.target.parentElement.querySelectorAll('.data-form__input');
  const card = {
    name: `${form[0].value}`,
    link: `${form[1].value}`
  }
  createCards(card);
  closePopup(evt);
}

//popup profile
function openPopupEditProfile() {
  const editProfile = document.querySelector('.popup-edit-profile');
  inputFullname.value = profileFullname.textContent;
  inputPosition.value = profilePosition.textContent;
  editProfile.querySelector('.data-form__btn-save').addEventListener(eventClick, handleFormSubmit)
  openPopup(editProfile);
}


//Изменение данных в profile на сайте данными из формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileFullname.textContent = inputFullname.value;
  profilePosition.textContent = inputPosition.value;
  closePopup(evt);
}

//popup preview image
function openPopupPreviewImage(urlImage, caption) {
  const popupImage = document.querySelector('.popup-image');
  const image = popupImage.querySelector('.preview__image');
  image.src = urlImage;
  image.alt = caption + ' не найдена.';
  popupImage.querySelector('.preview__caption').textContent = caption;
  openPopup(popupImage);
}

/* ----------------------------- card -----------------------------*/
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Инициализация default card
createCards(...initialCards);

function createCards(...objCard) {
  const cardsContainer = document.querySelector('.cards');
  const cardTemplate = document
      .querySelector('#card-template')
      .content
      .cloneNode(true);
  const cardElement = cardTemplate.querySelector('.card');

  objCard.forEach(card => {
    const cloneCard = cardElement.cloneNode(true);
    const image = cloneCard.querySelector('.card__image');
    image.src = card.link;
    image.alt = `Изображение ${card.name}`;
    image.addEventListener(eventClick, () => openPopupPreviewImage(card.link, card.name));

    const imageCaption = cloneCard.querySelector('.card__caption');
    imageCaption.textContent = card.name;

    cloneCard.querySelector('.card__like').addEventListener(eventClick, toggleLike);
    cloneCard.querySelector('.card__btn_type_trash').addEventListener(eventClick, trashCard);

    cardsContainer.prepend(cloneCard);
  })
}

function toggleLike() {
  const classLikeActive = 'card__like_active';
  this.classList.toggle(classLikeActive);
}

function trashCard() {
  this
      .parentElement
      .remove();
}