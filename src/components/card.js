import { likeCard, deleteLikeCard } from "./api";

// Функция создания карточки
const createCard = (card, deleteCard, cardLike, showImageModal, userId) => {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");
  const cardbuttonDelete = cardItem.querySelector(".card__delete-button");
  const cardbuttonLike = cardItem.querySelector(".card__like-button");
  const cardLikeCount = cardItem.querySelector(".card__like-count");
  cardImage.addEventListener("click", () => {
    showImageModal(card);
  });
  if (card.likes.some((like) => like._id === userId)) {
    cardbuttonLike.classList.add("card__like-button_is-active");
  }
  cardLikeCount.textContent = card.likes.length;
  cardItem.dataset.cardId = card._id;
  cardItem.dataset.ownerId = card.owner._id;
  cardTitle.textContent = card.name;
  cardImage.alt = card.name;
  cardImage.src = card.link ? card.link : "images/unnamed.jpg";
  cardImageError(cardImage, showImageModal, card);
  cardbuttonLike.addEventListener("click", () => {
    cardLike(card._id, cardbuttonLike, cardLikeCount);
  });

  if (card.owner._id === userId) {
    cardbuttonDelete.addEventListener("click", () => {
      deleteCard(card._id);
    });
  } else {
    cardbuttonDelete.remove();
  }

  return cardItem;
};

// Функция Like
const cardLike = (cardId, cardbuttonLike, cardLikeCount) => {
  if (cardbuttonLike.classList.contains("card__like-button_is-active")) {
    deleteLikeCard(cardId)
      .then((updatedCard) => {
        cardbuttonLike.classList.remove("card__like-button_is-active");
        cardLikeCount.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCard(cardId)
      .then((updatedCard) => {
        cardbuttonLike.classList.add("card__like-button_is-active");
        cardLikeCount.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const cardImageError = (cardImage, showImageModal, card) => {
  cardImage.onerror = () => {
    cardImage.src = "images/unnamed.jpg";
    cardImage.addEventListener("click", () => {
      const errorImage = {
        name: card.name,
        link: "images/unnamed.jpg",
      };
      showImageModal(errorImage);
    });
  };
};

// Экспорт функций
export { createCard, cardLike };
