// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
const createCard = (card, cardDelete) => {
  const cardItems = cardTemplate.querySelector(".card").cloneNode(true);
  const buttonDelete = cardItems.querySelector(".card__delete-button");
  cardItems.querySelector(".card__image").alt = card.name;
  cardItems.querySelector(".card__image").src = card.link;
  cardItems.querySelector(".card__title").textContent = card.name;

  buttonDelete.addEventListener("click", cardDelete);

  return cardItems;
};

// @todo: Функция удаления карточки
const cardDelete = (evt) => {
  const card = evt.target.closest(".card");
  card.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  cardList.append(createCard(card, cardDelete));
});
