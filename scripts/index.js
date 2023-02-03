const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profilePopupForm = document.getElementById("profile-form");
const profilePopupCloseButton = document.querySelector(".popap__close-button");

function openProfileEditPopup () {

  renderPopup();

  profileEditPopup.classList.add("popup_opened");
}

function closeProfileEditPopup () {
  profileEditPopup.classList.remove("popup_opened");
}

function renderProfile (name, description) {
  profileName.textContent = name;
  profileDescription.textContent = description;
}

function renderPopup () {
  profilePopupForm.elements["name"].value = profileName.textContent;
  profilePopupForm.elements["description"].value = profileDescription.textContent;
}

function onProfileFormSubmit (evt) {

  evt.preventDefault();

  const name = profilePopupForm.elements["name"].value
  const description = profilePopupForm.elements["description"].value

  renderProfile(name, description);

  closeProfileEditPopup();
}

profileEditButton.addEventListener('click', openProfileEditPopup);
profilePopupCloseButton.addEventListener('click', closeProfileEditPopup);

profilePopupForm.addEventListener('submit', onProfileFormSubmit);
