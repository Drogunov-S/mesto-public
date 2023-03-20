/* ----------------------------- Imports -----------------------------*/
import css from '../pages/index.css';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithConfirmation} from "../components/PopupWithConfirmation";
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
  profileAvatarSelector,
  profileAvatarOverlaySelecor
} from '../utils/constants';


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
      .then(cardData => {
        const rendererCard = sectionCards.renderItem(cardData);
        sectionCards.addItem(rendererCard)
      })
      .catch(console.log)
      .then(() => popupAddPost.close())
});

const popupEditProfile = new PopupWithForm(popupEditProfileSelector,
    (data) => {
      popupEditProfile.isLoadingData(true, "Сохранение...");
      api.updateUserInfo(data)
          .then(userData => userInfo.setUserInfo(userData))
          .catch(console.log)
          .then(() => popupEditProfile.close())
          .catch(console.log)
          .finally(() => {
            popupEditProfile.isLoadingData(false, "Сохранить");
          });
    });

const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, (data) => {
  popupEditAvatar.isLoadingData(true, "Сохранение...");
  api.updateAvatar(data)
      .then(userData => userInfo.setAvatar(userData.avatar))
      .catch(console.log)
      .then(() => popupEditAvatar.close())
      .catch(console.log)
      .finally(() => {
        popupEditAvatar.isLoadingData(false, "Сохранить");
      });
});

const popupWithConfirmation = new PopupWithConfirmation(propertiesPopupWithConfirmation);

/* ----------------------------- Enable validation -----------------------------*/
const profileFormValidator = new FormValidator(propertiesValidator, document.formProfile);
profileFormValidator.enableValidation();
const newPostFormValidator = new FormValidator(propertiesValidator, document.formNewPost);
newPostFormValidator.enableValidation();
const editAvatarFormValidator = new FormValidator(propertiesValidator, document.formEditAvatar);
editAvatarFormValidator.enableValidation();

/* ----------------------------- Default listeners -----------------------------*/
document
    .querySelector(profileEditBtnSelector)
    .addEventListener(clickEvent, () => {
      popupEditProfile.open();
      profileFormValidator.resetErrors();
      popupEditProfile.setDefaultValue(userInfo.getUserInfo());
    });

document
    .querySelector(profileAvatarOverlaySelecor)
    .addEventListener(clickEvent, () => {
      editAvatarFormValidator.resetErrors();
      popupEditAvatar.open();
    })

document
    .querySelector(profileAddBtnSelector)
    .addEventListener(clickEvent, () => {
      newPostFormValidator.resetErrors();
      popupAddPost.open();
    });


/* ----------------------------- Section -----------------------------*/
const renderer = (item) => {
  return new Card(
      propertiesCard,
      item,
      cardTemplateId,
      popupImage.open.bind(popupImage),
      popupWithConfirmation.open.bind(popupWithConfirmation),
      deleteCardCallback,
      toggleLikeCallback,
      userInfo.getUserId()
  ).renderCard();
}

const sectionCards = new Section(renderer, containerCards);

/* ----------------------------- API -----------------------------*/
const api = new Api(propertiesApi);

const toggleLikeCallback = (card) => {
  const id = card.getId();
  if (!card.isLike) {
    api.likeCard(id)
        .then(updatedCard => {
          card.update(updatedCard, true);
        })
  } else {
    api.unlikeCard(id)
        .then(updatedCard => {
          card.update(updatedCard, false);
        })
  }
}

const deleteCardCallback = (card) => {
  api.deleteCard(card.getId())
      .then(response => {
        if (response.ok) {
          card.trashCard();
        }
      })
      .catch(err => `Delete error: ${err}`)
      .then(() => popupWithConfirmation.close())
      .catch(console.log);
}

/* ----------------------------- Init -----------------------------*/
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(arr => {
      userInfo.setUserInfo(arr[0]);
      return Promise.resolve(arr[1]);
    })
    .catch(console.log)
    .then(cards => {
      cards.reverse();
      cards.forEach(card => {
        const newCard = sectionCards.renderItem(card,);
        sectionCards.addItem(newCard);
      })
    })
    .catch(err => console.log(`${err} Даже не знаю какая тут может быть ошибка.`));



