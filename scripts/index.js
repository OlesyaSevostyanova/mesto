const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profilePopupForm = document.querySelector(".profile-edit-form");
const profilePopupCloseButton = document.querySelector(".popup__close-button");

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
