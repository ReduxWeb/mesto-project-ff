const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEsc);
};

const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEsc);
};

// Закрытие модалки при нажатие кнопки ESC
const closeByEsc = (evt) => {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    closeModal(openPopup);
  }
};

const closeModalBackdrop = (evt) => {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
};

export { openModal, closeModal, closeModalBackdrop };
