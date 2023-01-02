const popupOpened = 'popup_opened';
const profileFullname = document.querySelector('.profile__full-name');
const profilePosition = document.querySelector('.profile__position');
const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');

document
    .querySelector('.profile__edit-btn')
    .addEventListener('click', openEditProfile);
document
    .querySelector('.profile__add-btm')
    .addEventListener('click', addPost);

document.querySelector('.popup__close')
    .addEventListener('click', closePopup);

/* ----------------------------- popups -----------------------------*/

//Открытие попап
function openPopup() {
  cleanResource();
  popup.classList.add(popupOpened);
}

//Закрытие попап
function closePopup() {
  popup.classList.remove(popupOpened);
}

//Очистка попапа
function cleanResource() {
  const element = document.querySelector('.popup__item');
  if (element) {
    popup.classList.forEach(clazz => {
      if (clazz.includes('popup_blackout')) {
        popup.classList.remove(clazz);
      }
    })
    element.remove();
  }
}

//popup newPost
function addPost() {
  openPopup();
  popup.classList.add('popup_blackout_medium');
  const templateForm = document.querySelector('#data-form').content.cloneNode(true);
  const form = templateForm.querySelector('.popup__item');
  form.querySelector('.data-form__title').textContent = 'Новое место';
  form.querySelector('.data-form__form').setAttribute('name', 'profileForm');
  const inputs = form.querySelectorAll('.data-form__input');
  inputs[0].classList.add('data-form__input_type_post-title');
  inputs[0].setAttribute('aria-label', 'Название места');
  inputs[0].setAttribute('name', 'postTitle');
  inputs[0].setAttribute('type', 'text');
  inputs[0].setAttribute('placeholder', 'Название');
  inputs[1].classList.add('data-form__input_type_url');
  inputs[1].setAttribute('aria-label', 'Ссылка на картинку');
  inputs[1].setAttribute('name', 'postUrl');
  inputs[1].setAttribute('type', 'url');
  inputs[1].setAttribute('placeholder', 'Ссылка на картинку');
  form.querySelector('.data-form__btn_type_save').textContent = 'Создать';
  form.querySelector('.data-form__form')
      .addEventListener('submit', addedPostOnSite);

  popupContainer.append(form);
}

//Добавление поста на сайт
function addedPostOnSite(evt) {
  evt.preventDefault();
  const form = document.querySelectorAll('.data-form__input');
  console.log(form);
  const card = {
    name: `${form[0].value}`,
    link: `${form[1].value}`
  }
  createCards(card);
  closePopup();
}

//popup profile
function openEditProfile() {
  openPopup();
  popup.classList.add('popup_blackout_medium');
  const templateForm = document.querySelector('#data-form').content.cloneNode(true);
  const form = templateForm.querySelector('.popup__item');
  form.querySelector('.data-form__title').textContent = 'Редактировать профиль';
  form.querySelector('.data-form__form').setAttribute('name', 'profileForm');
  const inputs = form.querySelectorAll('.data-form__input');
  inputs[0].classList.add('data-form__input_type_text-fullname');
  inputs[0].setAttribute('value', profileFullname.textContent)
  inputs[0].setAttribute('aria-label', 'Изменить имя');
  inputs[0].setAttribute('name', 'fullname');
  inputs[0].setAttribute('type', 'text');
  inputs[0].setAttribute('placeholder', 'ФИО');
  inputs[1].classList.add('data-form__input_type_text-position');
  inputs[1].setAttribute('value', profilePosition.textContent);
  inputs[1].setAttribute('aria-label', 'Изменить профессию');
  inputs[1].setAttribute('name', 'position');
  inputs[1].setAttribute('type', 'text');
  inputs[1].setAttribute('placeholder', 'Профессия');
  form.querySelector('.data-form__btn_type_save').textContent = 'Сохранить';
  form.querySelector('.data-form__form')
      .addEventListener('submit', handleFormSubmit);

  popupContainer.append(form);
}


//Изменение данных в profile на сайте данными из формы
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileFullname.textContent = document
      .querySelector('.data-form__input_type_text-fullname')
      .value;
  profilePosition.textContent = document
      .querySelector('.data-form__input_type_text-position')
      .value;
  closePopup();
}

//popup preview image
function openPreviewImage(urlImage, caption) {
  openPopup();
  popup.classList.add('popup_blackout_highly');

  const htmlElementFigure = document.createElement('figure');
  htmlElementFigure.classList.add('preview', "popup__item");

  const htmlElementImg = document.createElement('img');
  htmlElementImg.classList.add('preview__image');
  htmlElementImg.src = urlImage;

  const htmlElementFiguration = document.createElement('figcaption');
  htmlElementFiguration.classList.add('preview__caption');
  htmlElementFiguration.textContent = caption;

  popupContainer.append(htmlElementFigure);
  htmlElementFigure.append(htmlElementImg, htmlElementFiguration);
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
    image.addEventListener('click', () => openPreviewImage(card.link, card.name));

    const imageCaption = cloneCard.querySelector('.card__caption');
    imageCaption.textContent = card.name;

    cloneCard.querySelector('.card__like').addEventListener('click', toggleLike);
    cloneCard.querySelector('.card__btn_type_trash').addEventListener('click', trashCard);

    cardsContainer.prepend(cloneCard);
  })
}

function toggleLike() {
  this.classList.toggle('card__like_active');
}

function trashCard() {
  this
      .parentElement
      .remove();
}

