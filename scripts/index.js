const validationConfig = {
  formClassSelector: '.popup__form',
  formFieldClassSelector: '.popup__form-field',
  inputClassSelector: '.popup__form-field-input',
  inputErrorModifierClassSelector: '.popup__form-field-input_error',
  errorMessageClassSelector: '.popup__form-field-error',
  errorMessageActiveModifierClass: 'popup__form-filed-error_active',
  submitButtonClassSelector: '.popup__submit-button',
  submitButtonDisabledModifierClass: 'popup__submit-button_disabled',
}

// общие функция для всех попапов

function openPoup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");

  document.removeEventListener('keyup', handlePressEscape);
}

document.querySelectorAll(".popup").forEach(popap => {
  // между .popup и .popup__content есть .popup__container (реализующий grid) и кнопка закрытия popup
  // popup__content изолирует клики в контенте от любого нажатия за его пределами
  popap.querySelector(".popup__content").addEventListener('click', evt => {
    evt.stopPropagation();
  });
  // т.к. нажатие на кнопку закрытия и/или на пространство .popup__container (реализующего grid) 
  // должно закрывать форму, вместо установки обработчиков на каждого из них "ловим" любые клики по ним на родителе
  // который уже доступен тут - не надо дополнительно получать (тот-же .popup__container например)
  popap.addEventListener('click', () => closePopup(popap));
});

const handlePressEscape = popup => (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc' || evt.keyCode === 27) {
    closePopup(popup);
  }
}

// попап "Редактировать профиль"

const profileEditPopup = document.querySelector(".profile-edit-form-popup");
const profileEditForm = document.forms["profile-edit-form"];
const profileEditFormSubmitButton = profileEditForm.querySelector(".popup__submit-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

function handleProfileEditButtonClick() {
  profileEditForm.elements["name"].value = profileName.textContent;
  profileEditForm.elements["description"].value = profileDescription.textContent;
  document.addEventListener('keyup', handlePressEscape(profileEditPopup));
  toggleButtonState(profileEditForm, profileEditFormSubmitButton, validationConfig);
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
const addCardFormSubmitButton = addCardForm.querySelector(".popup__submit-button");

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  createCard(
    addCardForm.elements["name"].value,
    addCardForm.elements["link"].value
  )
  addCardForm.reset();
  closePopup(addCardPopup);
}

addCardButton.addEventListener('click', () => {
  document.addEventListener('keyup', handlePressEscape(addCardPopup));
  toggleButtonState(addCardForm, addCardFormSubmitButton, validationConfig);
  openPoup(addCardPopup);
});

addCardForm.addEventListener('submit', handleAddCardFormSubmit);

// Заполняем стартовые карточки

initialCards.forEach(card => createCard(card.name, card.link));

enableValidation(validationConfig);
