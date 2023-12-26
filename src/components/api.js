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

const request = async (endpoint, options) => {
  return fetch(`${config.baseUrl}/${endpoint}`, options).then((res) =>
    getResponseData(res)
  );
};

//Получение карточек с сервера
const getCardsData = async () => {
  return request("cards", {
    headers: config.headers,
  });
};

// Получение данных профиля пользователя
const getUserProfile = async () => {
  return request("users/me", {
    headers: config.headers,
  });
};

const getAllInfo = async () => {
  return Promise.all([getUserProfile(), getCardsData()]);
};

//Добавление новых карточек
const cardNewAdd = async (card) => {
  return request("cards", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  });
};

//Удаление карточки
const cardDelete = async (cardId) => {
  return request(`cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

// Обновление профиля позьзователя
const updateUserProfile = async (userProfile) => {
  return request("users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userProfile.name,
      about: userProfile.about,
    }),
  });
};

// Обновление аватарки пользователя
const updateAvatar = async (avatarImage) => {
  return request("users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarImage,
    }),
  });
};

// Лайк
const likeCard = async (cardId) => {
  return request(`cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
};

// Удаление лайка
const deleteLikeCard = async (cardId) => {
  return request(`cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
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
