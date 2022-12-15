const popupOpened = 'popup_opened';

let profileFullname = document.querySelector('.profile__full-name');
let profilePosition = document.querySelector('.profile__position');
let popup = document.querySelector('.popup');
let inputName = document.querySelector('.popup__input_type_text-fullname');
let inputPosition = document.querySelector('.popup__input_type_text-position');

document
  .querySelector('.popup__form')
  .addEventListener('submit', handleFormSubmit);

document
  .querySelector('.profile__edit-btn')
  .addEventListener('click', openPopup);

document.querySelector('.popup__close')
  .addEventListener('click', closePopup);


let likes = document.querySelectorAll('.card__like');
likes.forEach(like => like.addEventListener('click', toggleLike));

function toggleLike() {
  this.classList.toggle('card__like_active');
}

function openPopup() {
  let fullname = profileFullname.textContent;
  let position = profilePosition.textContent;
  inputName.value = fullname;
  inputPosition.value = position;
  let classList = popup.classList;
  classList.add(popupOpened);
}

function closePopup() {
  popup.classList.remove(popupOpened);

}

function handleFormSubmit(evt) {
  evt.preventDefault();
  let updateFullname = inputName.value;
  let updatePosition = inputPosition.value;
  profileFullname.textContent = updateFullname;
  profilePosition.textContent = updatePosition;
  closePopup();
}

