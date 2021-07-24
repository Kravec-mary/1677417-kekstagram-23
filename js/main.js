import './function-form.js';
import {request} from './fetch.js';
import {getPhotos} from './make-miniature.js';

let pictures = [];

const success = (data) => {
  pictures = data.slice();
  getPhotos(data);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const error = () => {
  const messageAlert = document.createElement('div');
  const body = document.querySelector('body');
  messageAlert.style.zIndex = '100';
  messageAlert.style.position = 'fixed';
  messageAlert.style.top = '0';
  messageAlert.style.left = '0';
  messageAlert.style.width = '100%';
  messageAlert.style.height = '15%';
  messageAlert.style.fontSize = '22px';
  messageAlert.style.lineHeight = '2em';
  messageAlert.style.textAlign = 'center';
  messageAlert.style.backgroundColor = 'rgba(164, 206, 282, 2.9)';
  messageAlert.textContent = 'Не удалось загрузить данные!';
  body.appendChild(messageAlert);
};
request(success, error, 'GET');

export {pictures};
