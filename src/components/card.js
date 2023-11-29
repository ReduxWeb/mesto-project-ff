// Функция создания карточки
const createCard = (card, deleteCard, cardLike, showImageModal) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const buttonDelete = cardItem.querySelector(".card__delete-button");
  const buttonLike = cardItem.querySelector(".card__like-button");
  cardImage.addEventListener("click", () => {
    showImageModal(card);
  });
  buttonDelete.addEventListener("click", deleteCard);
  buttonLike.addEventListener("click", cardLike);
  cardTitle.textContent = card.name;
  cardImage.alt = card.name;
  cardImage.src = card.link;

  return cardItem;
};
// Функция удаления карточки
const deleteCard = (evt) => {
  evt.target.closest(".card").remove();
};
// Функция Like
const cardLike = (evt) => {
  evt.target.classList.toggle("card__like-button_is-active");
};

// Экспорт функций
export { createCard, deleteCard, cardLike };
