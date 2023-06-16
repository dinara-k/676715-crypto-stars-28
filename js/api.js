const BASE_URL = 'https://cryptostar.grading.pages.academy';
const Route = {
  USER_GET_DATA: '/user',
  CONTRACTORS_GET_DATA: '/contractors',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const userGetData = () => load(Route.USER_GET_DATA, ErrorText.GET_DATA);
const contractorsGetData = () => load(Route.CONTRACTORS_GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export {userGetData, contractorsGetData, sendData};
