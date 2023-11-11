// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
const createCard = (card, deleteCard) => {
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const buttonDelete = cardItem.querySelector(".card__delete-button");
  cardTitle.textContent = card.name;
  cardImage.alt = card.name;
  cardImage.src = card.link;

  buttonDelete.addEventListener("click", deleteCard);

  return cardItem;
};

// @todo: Функция удаления карточки
const deleteCard = (evt) => {
  const card = evt.target.closest(".card");
  card.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  cardList.append(createCard(card, deleteCard));
});
