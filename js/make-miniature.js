import {photos} from './utils/get-object.js';


const photoTemplate = document.querySelector('#picture').content.querySelector('.picture'); //находим шаблон
const picturesContainer = document.querySelector('.pictures');


const renderPhoto = (photo) => {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

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
