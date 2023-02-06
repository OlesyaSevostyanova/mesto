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

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profilePopupForm = document.querySelector(".profile-edit-form");
const profilePopupCloseButton = document.querySelector(".popup__close-button");

const elementList = document.querySelector(".elements__list");
const elementTemplate = document.querySelector("#element-template").content;

function cardLikeToggle (evt) {
  evt.target.classList.toggle("element__like-button_active");
}

function deleteCard (evt) {
  evt.target.parentElement.remove();
}

function createCard (card) {
  const newCard =  elementTemplate.querySelector(".element").cloneNode(true);
   
  const elementImage = newCard.querySelector(".element__image");
  elementImage.src = card.link
  elementImage.alt = card.name

  newCard.querySelector(".element__name").textContent = card.name;

  newCard.querySelector(".element__like-button").addEventListener('click', cardLikeToggle);
  newCard.querySelector(".element__trash-button").addEventListener('click', deleteCard);

  elementList.prepend(newCard);
}

initialCards.forEach(card => createCard(card));

function openProfileEditPopup () {
  renderPopup();
  profileEditPopup.classList.add("popup_opened");
}

function closeProfileEditPopup () {
  profileEditPopup.classList.remove("popup_opened");
}

function renderPopup () {
  profilePopupForm.elements["name"].value = profileName.textContent;
  profilePopupForm.elements["description"].value = profileDescription.textContent;
}

function onProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupForm.elements["name"].value;
  profileDescription.textContent = profilePopupForm.elements["description"].value;
  closeProfileEditPopup();
}

profileEditButton.addEventListener('click', openProfileEditPopup);
profilePopupCloseButton.addEventListener('click', closeProfileEditPopup);
profilePopupForm.addEventListener('submit', onProfileFormSubmit);
