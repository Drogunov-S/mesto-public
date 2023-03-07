const popupImageSelector = '.popup-image';
const popupAddPostSelector = '.popup-add-post';
const popupEditProfileSelector = '.popup-edit-profile';


const cardTemplateId = '#card-template';
const containerCards = '.cards';

const profileEditBtnSelector = '.profile__edit-btn';
const profileAddBtnSelector = '.profile__add-btm';

const clickEvent = 'click';
const profileFullnameSelector = '.profile__full-name';
const profilePositionSelector = '.profile__position';

const initialCards = [
  {
    title: 'Архыз',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export {
  popupAddPostSelector,
  profileAddBtnSelector,
  popupEditProfileSelector,
  popupImageSelector,
  cardTemplateId,
  containerCards,
  profileEditBtnSelector,
  clickEvent,
  profileFullnameSelector,
  profilePositionSelector,
  initialCards
};
