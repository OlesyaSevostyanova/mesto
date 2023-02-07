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

// общая функция для всех попапов

function closePopup(evt) {
  evt.target.closest(".popup").classList.remove("popup_opened");
}


// попап "Создать место"

const addCardButton = document.querySelector(".profile__add-button");
const addCardForm = document.querySelector("#add-card-form");
const addCardPopup = addCardForm.closest(".popup");
const addCardPopupCloseButton = addCardPopup.querySelector(".popup__close-button");

function openAddCardPopup() {
  addCardPopup.classList.add("popup_opened");
}

function onAddCardFormSubmit(evt) {
  evt.preventDefault();
  createCard(
    addCardForm.elements["name"].value,
    addCardForm.elements["link"].value
  )
  addCardForm.elements["name"].value = "",
  addCardForm.elements["link"].value = ""
  closePopup(evt);
}

addCardButton.addEventListener('click', openAddCardPopup);
addCardPopupCloseButton.addEventListener('click', closePopup);
addCardForm.addEventListener('submit', onAddCardFormSubmit);


// попап "Редактировать профиль"

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditForm = document.querySelector("#profile-edit-form");
const profileEditPopup = profileEditForm.closest(".popup");
const profileEditPopupCloseButton = profileEditPopup.querySelector(".popup__close-button");

function openProfileEditPopup() {
  profileEditForm.elements["name"].value = profileName.textContent;
  profileEditForm.elements["description"].value = profileDescription.textContent;
  profileEditPopup.classList.add("popup_opened");
}

function onProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileEditForm.elements["name"].value;
  profileDescription.textContent = profileEditForm.elements["description"].value;
  closePopup(evt);
}

profileEditButton.addEventListener('click', openProfileEditPopup);
profileEditPopupCloseButton.addEventListener('click', closePopup);
profileEditForm.addEventListener('submit', onProfileFormSubmit);

// попап карточки "с картинкой"

const imagePopup = document.querySelector(".image-popup");
const imagePopupImage = imagePopup.querySelector(".image-popup__image")
const imagePopupName = imagePopup.querySelector(".image-popup__name")

const imagePopupPopupCloseButton = imagePopup.querySelector(".popup__close-button");

function openImagePopup(evt) {
  const elementImage = evt.target;
  imagePopupImage.src = elementImage.src;
  imagePopupImage.alt = elementImage.alt;
  imagePopupName.textContent = elementImage.closest(".element").querySelector(".element__name").textContent;
  imagePopup.classList.add("popup_opened");
}

imagePopupPopupCloseButton.addEventListener('click', closePopup);

// добавление / удаление карточек

const elementsList = document.querySelector(".elements__list");
const elementTemplate = document.querySelector("#element-template").content;

function cardLikeToggle(evt) {
  evt.target.classList.toggle("element__like-button_active");
}

function deleteCard(evt) {
  evt.target.parentElement.remove();
}

function createCard(name, link) {
  const newCard = elementTemplate.querySelector(".element").cloneNode(true);

  const elementImage = newCard.querySelector(".element__image");
  elementImage.src = link;
  elementImage.alt = name;

  newCard.querySelector(".element__name").textContent = name;

  newCard.querySelector(".element__like-button").addEventListener('click', cardLikeToggle);
  newCard.querySelector(".element__trash-button").addEventListener('click', deleteCard);

  newCard.querySelector(".element__image").addEventListener("click", openImagePopup);

  elementsList.prepend(newCard);
}

// Заполняем стартовые карточки

initialCards.forEach(card => createCard(card.name, card.link));
