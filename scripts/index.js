// стартовые карточки

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

// общие функция для всех попапов

function openPoup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

document.querySelectorAll(".popup").forEach(popap => {
  popap.querySelector(".popup__close-button").addEventListener('click', () => closePopup(popap));
});

// попап "Редактировать профиль"

const profileEditPopup = document.querySelector(".profile-edit-form-popup");
const profileEditForm = document.forms["profile-edit-form"];
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

function handleProfileEditButtonClick() {
  profileEditForm.elements["name"].value = profileName.textContent;
  profileEditForm.elements["description"].value = profileDescription.textContent;
  openPoup(profileEditPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditForm.elements["name"].value;
  profileDescription.textContent = profileEditForm.elements["description"].value;
  closePopup(profileEditPopup);
}

profileEditButton.addEventListener('click', handleProfileEditButtonClick);
profileEditForm.addEventListener('submit', handleProfileFormSubmit);

// попап карточки "с картинкой"

const imagePopup = document.querySelector(".image-popup");
const imagePopupImage = imagePopup.querySelector(".image-popup__image")
const imagePopupName = imagePopup.querySelector(".image-popup__name")

const imagePopupPopupCloseButton = imagePopup.querySelector(".popup__close-button");

function handleImageClick(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupName.textContent = name;
  openPoup(imagePopup);
}

// добавление / удаление карточек

const elementsList = document.querySelector(".elements__list");
const elementTemplate = document.querySelector("#element-template").content;

function getCard(name, link) {
  const cardElement = elementTemplate.querySelector(".element").cloneNode(true);
  const likeButton = cardElement.querySelector(".element__like-button");
  const trashButtom = cardElement.querySelector(".element__trash-button");
  const cardImage = cardElement.querySelector(".element__image");
  const cardText = cardElement.querySelector(".element__name");

  cardImage.src = link;
  cardImage.alt = name;
  cardText.textContent = name;

  likeButton.addEventListener('click', () => likeButton.classList.toggle("element__like-button_active"));

  trashButtom.addEventListener('click', () => cardElement.remove());

  cardImage.addEventListener("click", () => handleImageClick(name, link));

  return cardElement;
}

function createCard(name, link) {
  const newCard = getCard(name, link);
  elementsList.prepend(newCard);
}

// попап "Создать место"

const addCardPopup = document.querySelector(".add-card-form-popup");
const addCardButton = document.querySelector(".profile__add-button");
const addCardForm = document.forms["add-card-form"];

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  createCard(
    addCardForm.elements["name"].value,
    addCardForm.elements["link"].value
  )
  addCardForm.reset();
  closePopup(addCardPopup);
}

addCardButton.addEventListener('click', () => openPoup(addCardPopup));
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

// Заполняем стартовые карточки

initialCards.forEach(card => createCard(card.name, card.link));
