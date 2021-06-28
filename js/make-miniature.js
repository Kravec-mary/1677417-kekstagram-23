import {photos, getRandomInt, Likes, addComments} from './utils/get-object.js';


const photoTemplate = document.querySelector('#picture').content.querySelector('.picture'); //находим шаблон
const picturesContainer = document.querySelector('.pictures');


const renderPhoto = (photo) => {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('img').src = photo.url;

  return photoElement;
};

const fragment = document.createDocumentFragment();

const renderPhotos = (data) => {
  data.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo));
  });

  picturesContainer.appendChild(fragment);
};

renderPhotos(photos);

const likes = document.querySelector('.likes-count');
likes.textContent = getRandomInt(Likes.MIN, Likes.MAX);

const comments = document.querySelector('.comments-count');
comments.textContent = addComments();
