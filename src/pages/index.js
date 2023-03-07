/* ----------------------------- Imports -----------------------------*/
import css from '../pages/index.css';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {FormValidator} from '../components/Validate.js';
import {Card} from '../components/Card.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {propertiesCard, propertiesPopupWithImage, propertiesValidator} from '../utils/properties.js';
import {
  popupImageSelector,
  popupEditProfileSelector,
  popupAddPostSelector,
  cardTemplateId,
  containerCards,
  profileEditBtnSelector,
  clickEvent,
  profileFullnameSelector,
  profilePositionSelector,
  profileAddBtnSelector,
  initialCards
} from '../utils/constants';

/* ----------------------------- UserInfo -----------------------------*/
const userInfo = new UserInfo(
    profileFullnameSelector,
    profilePositionSelector
);

/* ----------------------------- popups -----------------------------*/
const popupImage = new PopupWithImage(popupImageSelector, propertiesPopupWithImage);

const popupAddPost = new PopupWithForm(popupAddPostSelector, (evt) => {
  evt.preventDefault();
  sectionCards.addNewPost(popupAddPost._getInputValues());
  popupAddPost.close();
});

const popupEditProfile = new PopupWithForm(popupEditProfileSelector,
    (evt) => {
      evt.preventDefault();
      userInfo.setUserInfo(popupEditProfile._getInputValues());
      popupEditProfile.close();
    });

/* ----------------------------- Enable validation -----------------------------*/
new FormValidator(propertiesValidator, document.profileForm).enableValidation();
new FormValidator(propertiesValidator, document.formNewPost).enableValidation();

/* ----------------------------- Section -----------------------------*/
const sectionCards = new Section({
  items: initialCards, renderer: (item) => {
    const newCard = new Card(
        propertiesCard,
        item,
        cardTemplateId,
        popupImage.open.bind(popupImage)
    ).renderCard();
    sectionCards.addItem(newCard);
  }
}, containerCards);

/* ----------------------------- Default listeners -----------------------------*/

document
    .querySelector(profileEditBtnSelector)
    .addEventListener(clickEvent, () => {
      popupEditProfile.open();
      popupEditProfile.setDefaultValue(userInfo.getUserInfo());
    });

document
    .querySelector(profileAddBtnSelector)
    .addEventListener(clickEvent, popupAddPost.open.bind(popupAddPost));

/* ----------------------------- Default data init -----------------------------*/
sectionCards.renderItems();
