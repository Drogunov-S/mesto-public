/* Открытие popup */
let bottonEdit = document.querySelector('.profile__edit-botton');
bottonEdit.addEventListener('click', openPopup);

function openPopup() {
    let fullname = document.querySelector('.profile__full-name').textContent;
    let position = document.querySelector('.profile__position').textContent;
    let formFullname = document.querySelector('.popup__fullname');
    let formPosition = document.querySelector('.popup__position');
    formFullname.value = fullname;
    formPosition.value = position;

    let popupProfile = document.querySelector('.popup');
    let classList = popupProfile.classList;
    classList.add('popup_opened');
}


document.querySelector('.popup__close').addEventListener('click', closePopup);

function closePopup() {
    let popupProfile = document.querySelector('.popup');
    popupProfile.classList.remove('popup_opened');
}

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__fullname');
let jobInput = document.querySelector('.popup__position');
function handleFormSubmit(evt) {
    evt.preventDefault();
    let updateFullname = nameInput.value;
    let updatePosition = jobInput.value;
    let profileName = document.querySelector('.profile__full-name');
    profileName.textContent = updateFullname;
    let profilePosition = document.querySelector('.profile__position');
    profilePosition.textContent = updatePosition;
    closePopup()
}


formElement.addEventListener('submit', handleFormSubmit);