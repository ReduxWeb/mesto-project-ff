// Конфиг с токеном и названием группы
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-3",
  headers: {
    authorization: "689fbdbf-7413-4da2-8d7e-5f266f696eb4",
    "Content-Type": "application/json",
  },
};
// Функция обработки запроса
const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка сервера: ${res.status}`);
};

//Получение карточек с сервера
const getCardsData = async () => {
  return fetch(config.baseUrl + "/cards", {
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

// Получение данных профиля пользователя
const getUserProfile = async () => {
  return fetch(config.baseUrl + "/users/me", {
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

const getAllInfo = async () => {
  return Promise.all([getUserProfile(), getCardsData()]);
};

//Добавление новых карточек
const cardNewAdd = async (card) => {
  return fetch(config.baseUrl + "/cards", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  }).then((res) => getResponseData(res));
};

//Удаление карточки
const cardDelete = async (cardId) => {
  return fetch(config.baseUrl + `/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

// Обновление профиля позьзователя
const updateUserProfile = async (userProfile) => {
  return fetch(config.baseUrl + "/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userProfile.name,
      about: userProfile.about,
    }),
  }).then((res) => getResponseData(res));
};

// Обновление аватарки пользователя
const updateAvatar = async (avatarImage) => {
  return fetch(config.baseUrl + "/users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarImage,
    }),
  }).then((res) => getResponseData(res));
};

// Лайк
const likeCard = async (cardId) => {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

// Удаление лайка
const deleteLikeCard = async (cardId) => {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResponseData(res));
};

export {
  getAllInfo,
  cardNewAdd,
  cardDelete,
  updateAvatar,
  updateUserProfile,
  likeCard,
  deleteLikeCard,
};
