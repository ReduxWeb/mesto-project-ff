const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEsc);
};

const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEsc);
};

// Закрытие модалки при нажатие кнопки ESC
const closeEsc = (evt) => {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    closeModal(openPopup);
  }
};

const closeModalBackdrop = (evt, popup) => {
  if (evt.target === popup) {
    closeModal(popup);
  }
};

export { openModal, closeModal, closeModalBackdrop };
