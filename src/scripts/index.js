//Импорт
import "../pages/index.css";
import {
  getAllInfo,
  cardNewAdd,
  updateAvatar,
  updateUserProfile,
  cardDelete,
} from "../components/api.js";
import { createCard, cardLike } from "../components/card.js";
import {
  openModal,
  closeModal,
  closeModalBackdrop,
} from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";

// cardList
const cardList = document.querySelector(".places__list");

//Popups
const popups = document.querySelectorAll(".popup");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const buttonsClose = document.querySelectorAll(".popup__close");
const showImage = document.querySelector(".popup_type_image");

//profileEdit
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");
const popupNewAvatar = document.querySelector(".popup_type_new-avatar");
const profileAvatar = document.querySelector(".profile__image");
const profileEditForm = document.forms["edit-profile"];
const buttonPopup = profileEditForm.querySelector(".popup__button");
const nameInput = profileEditForm.elements.name;
const descriptionInput = profileEditForm.elements.description;
const userName = document.querySelector(".profile__title");
const userDescription = document.querySelector(".profile__description");

const avatarForm = document.forms["edit-avatar"];
const avatarButton = avatarForm.querySelector(".popup__button");

//addCard
const addCardPopup = document.querySelector(".popup_type_new-card");
const updateAvatarPopup = document.querySelector(".popup_type_new-avatar");
const addCardForm = document.forms["new-place"];
const addCardFormButton = addCardForm.querySelector(".popup__button");
const addCardButton = document.querySelector(".profile__add-button");
const cardNameInput = addCardForm.elements["place-name"];
const cardLinkInput = addCardForm.elements.link;

const popupConfirm = document.querySelector(".popup_type_confirm");
const popupConfirmButton = popupConfirm.querySelector(".popup__button");

let userId;

// Конфиг для валидации полей
const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const renderLoadingButton = (isLoad, button) => {
  button.textContent = isLoad ? "Сохранение..." : "Сохранить";
};

//Default value text
const fillPopupProfileEditFormValues = () => {
  if (profileEditPopup.classList.contains("popup_is-opened")) {
    nameInput.value = userName.textContent;
    descriptionInput.value = userDescription.textContent;
  }
};

const fillProfileInfo = (userInfo) => {
  userName.textContent = userInfo.name;
  userDescription.textContent = userInfo.about;
  profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
};

//Функция для редактирования профиля
const editProfileForm = (evt) => {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
};

// Просмотр изображения
const showImageModal = (card) => {
  openModal(showImage);
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
};

//Функция для добавления новых карточек
const addCard = async (evt) => {
  evt.preventDefault();
  renderLoadingButton(true, addCardFormButton);
  const card = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  cardNewAdd(card)
    .then((cardItem) => {
      cardList.prepend(
        createCard(cardItem, deleteCard, cardLike, showImageModal, userId)
      );
      closeModal(addCardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoadingButton(false, addCardFormButton);
    });
};

const deleteCard = (cardId) => {
  openModal(popupConfirm);
  popupConfirmButton.dataset.cardId = cardId;
};

const handleDeleteCard = () => {
  const cardId = popupConfirmButton.dataset.cardId;
  cardDelete(cardId)
    .then(() => {
      const cardDelete = document.querySelector(`li[data-card-id="${cardId}"]`);
      cardDelete.remove();
      popupConfirmButton.dataset.cardId = "";
      closeModal(popupConfirm);
    })
    .catch((err) => {
      console.log(err);
    });
};

popupConfirmButton.addEventListener("click", handleDeleteCard);

// Закрытия popup при клике на фон
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    closeModalBackdrop(evt, popup);
  });
});

//Кнопка закрытия popup
buttonsClose.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    const openPopup = evt.target.closest(".popup");
    closeModal(openPopup);
  });
});

// Popups для редактирования профиля
profileEditButton.addEventListener("click", () => {
  openModal(profileEditPopup);
  fillPopupProfileEditFormValues();
  clearValidation(profileEditPopup, configValidation);
});

//Отправка формы редактировния профиля
profileEditForm.addEventListener("submit", editProfileForm);

// Popups для Добавление карточек
addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  openModal(addCardPopup);
  clearValidation(addCardPopup, configValidation);
});

//Обновление аватара
profileAvatar.addEventListener("click", () => {
  openModal(popupNewAvatar);
  avatarForm.link.value = "";
  clearValidation(popupNewAvatar, configValidation);
});

const handleProfileUpdate = async (evt) => {
  evt.preventDefault();
  renderLoadingButton(true, buttonPopup);
  updateUserProfile({
    name: profileEditForm.name.value,
    about: profileEditForm.description.value,
  })
    .then((updatedProfile) => {
      fillProfileInfo(updatedProfile);
      closeModal(profileEditPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoadingButton(false, buttonPopup);
      console.log("обновление профиля");
    });
};

const handleAvatarUpdate = async (evt) => {
  evt.preventDefault();
  renderLoadingButton(true, avatarButton);
  updateAvatar(avatarForm.link.value)
    .then((updatedProfile) => {
      console.log(updatedProfile);
      fillProfileInfo(updatedProfile);
      clearValidation(popupNewAvatar, configValidation);
      closeModal(updateAvatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoadingButton(false, avatarButton);
      console.log("обновление аватарки");
    });
};

// Отправка формы аватарки
avatarForm.addEventListener("submit", handleAvatarUpdate);

//Отправка карточки
addCardForm.addEventListener("submit", addCard);

// Отправка формы профиля
profileEditForm.addEventListener("submit", handleProfileUpdate);

// Вывести карточки на страницу
const renderInitialCards = (cards, userId) => {
  cards.forEach((card) => {
    cardList.append(
      createCard(card, deleteCard, cardLike, showImageModal, userId)
    );
  });
};

// Вызов валидации форм
enableValidation(configValidation);

getAllInfo()
  .then((data) => {
    const userInfo = data[0];
    userId = userInfo._id;
    const cards = data[1];
    fillProfileInfo(userInfo);
    renderInitialCards(cards, userId);
  })
  .catch((err) => {
    console.log(err);
  });
