//Импорт
import "../pages/index.css";
import { initialCards } from "../components/cards.js";
import { createCard, deleteCard, cardLike } from "../components/card.js";
import {
  openModal,
  closeModal,
  closeModalBackdrop,
} from "../components/modal.js";

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
const profileAddPopup = document.querySelector(".popup_type_new-card");
const profileEditForm = document.forms["edit-profile"];
const nameInput = profileEditForm.elements.name;
const descriptionInput = profileEditForm.elements.description;
const userName = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");

//addCard
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = document.forms["new-place"];
const addCardButton = document.querySelector(".profile__add-button");
const cardNameInput = addCardForm.elements["place-name"];
const cardLinkInput = addCardForm.elements.link;

//Default value text
const fillPopupProfileEditFormValues = () => {
  if (profileEditPopup.classList.contains("popup_is-opened")) {
    nameInput.value = userName.textContent;
    descriptionInput.value = description.textContent;
  }
};

//Функция для редактирования профиля
const editProfileForm = (evt) => {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  closeModal(profileEditPopup);
};

// Просмотр изображения
const showImageModal = (card) => {
  openModal(showImage);
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
};

//Функция для добавления новых карточек
const addCard = (evt) => {
  evt.preventDefault();
  const card = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  const newAddCard = createCard(card, deleteCard, cardLike, showImageModal);
  cardList.prepend(newAddCard);
  closeModal(addCardPopup);
};

// Закрытия popup при клике на фон
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    closeModalBackdrop(evt, popup);
  });
});

//Кнопка закрытия popup
buttonsClose.forEach((card) => {
  card.addEventListener("click", (evt) => {
    const openPopup = evt.target.closest(".popup");
    closeModal(openPopup);
  });
});

// Popups для редактирования профиля
profileEditButton.addEventListener("click", () => {
  openModal(profileEditPopup);
  fillPopupProfileEditFormValues();
});

//Отправка формы редактировния профиля
profileEditForm.addEventListener("submit", editProfileForm);

// Popups для Добавление карточек
addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  openModal(profileAddPopup);
});

//Отправка карточки
addCardForm.addEventListener("submit", addCard);

// Вывести карточки на страницу
initialCards.forEach((card) => {
  cardList.append(createCard(card, deleteCard, cardLike, showImageModal));
});
