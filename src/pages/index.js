/* ----------------------------- Imports -----------------------------*/
import css from '../pages/index.css';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {Api} from "../components/Api";
import {
  propertiesCard,
  propertiesPopupWithImage,
  propertiesValidator,
  propertiesPopupWithConfirmation, propertiesApi
} from '../utils/properties.js';
import {
  popupImageSelector,
  popupEditProfileSelector,
  popupAddPostSelector,
  popupEditAvatarSelector,
  cardTemplateId,
  containerCards,
  profileEditBtnSelector,
  clickEvent,
  profileFullnameSelector,
  profilePositionSelector,
  profileAddBtnSelector,
  profileAvatarSelector
} from '../utils/constants';
import {PopupWithConfirmation} from "../components/PopupWithConfirmation";


/* ----------------------------- UserInfo -----------------------------*/
const userInfo = new UserInfo(
    profileFullnameSelector,
    profilePositionSelector,
    profileAvatarSelector
);

/* ----------------------------- popups -----------------------------*/
const popupImage = new PopupWithImage(popupImageSelector, propertiesPopupWithImage);

const popupAddPost = new PopupWithForm(popupAddPostSelector, (data) => {
  api.postCard(data)
      .then(card => sectionCards.renderItem(card))
});

const popupEditProfile = new PopupWithForm(popupEditProfileSelector,
    (data) => {
      popupEditProfile.isLoadingData(true, "Сохранение...");
      api.updateUserInfo(data)
          .then(data => userInfo.setUserInfo(data))
          .finally(() => {
            popupEditProfile.isLoadingData(false, "Сохранить");
          });
    });

const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, (data) => {
  popupEditAvatar.isLoadingData(true, "Сохранение...");
  api.updateAvatar(data)
      .then(userData => userInfo.setAvatar(userData.avatar))
      .finally(() => {
        popupEditProfile.isLoadingData(false, "Сохранить");
      });
});

const popupWithConfirmation = new PopupWithConfirmation(propertiesPopupWithConfirmation);

/* ----------------------------- Enable validation -----------------------------*/
new FormValidator(propertiesValidator, document.formProfile).enableValidation();
new FormValidator(propertiesValidator, document.formNewPost).enableValidation();
new FormValidator(propertiesValidator, document.formEditAvatar).enableValidation();

/* ----------------------------- Default listeners -----------------------------*/
document
    .querySelector(profileEditBtnSelector)
    .addEventListener(clickEvent, () => {
      popupEditProfile.open();
      popupEditProfile.setDefaultValue(userInfo.getUserInfo());
    });

document
    .querySelector(".profile__avatar-overlay")
    .addEventListener(clickEvent, popupEditAvatar.open.bind(popupEditAvatar))

document
    .querySelector(profileAddBtnSelector)
    .addEventListener(clickEvent, popupAddPost.open.bind(popupAddPost));


/* ----------------------------- Section -----------------------------*/
const renderer = (item) => {
  const newCard = new Card(
      propertiesCard,
      item,
      cardTemplateId,
      popupImage.open.bind(popupImage),
      popupWithConfirmation.open.bind(popupWithConfirmation),
      api.deleteCard.bind(api),
      api.likeCard.bind(api),
      api.unlikeCard.bind(api),
      userInfo.getUserId()
  ).renderCard();
  sectionCards.addItem(newCard);
}

const sectionCards = new Section(renderer, containerCards);

/* ----------------------------- API -----------------------------*/
const api = new Api(propertiesApi);

/* ----------------------------- Init -----------------------------*/
api.getUserInfo()
    .then(userData => userInfo.setUserInfo(userData));
api.getInitialCards()
    .then(cards => {
      cards.reverse();
      sectionCards.renderItems(cards);
    });



