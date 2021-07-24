import {showBigPicture, closePopup} from './full-picture.js';
import {pictures} from './main.js';
const picturesSection = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const closePictureEsc = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closePopup();
  }
};

const removePhotos = () => {
  const photos = document.querySelectorAll('.picture');
  if (photos) {
    photos.forEach((photo) => photo.remove());
  }
};

const getPhoto = ({url, comments, likes, description}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(url, comments, likes, description);
    document.addEventListener('keydown', closePictureEsc);
  });
  return pictureElement;
};

const fragment = document.createDocumentFragment();
const getPhotos = (photos) => {
  photos.forEach((item) => {
    fragment.appendChild(getPhoto(item));
  });
  picturesSection.appendChild(fragment);
};

const RANDOM_PICTURES_NUMBER = 10;
const DELAY = 500;
const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
const filterButtons = imgFiltersForm.querySelectorAll('button');

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const allFilters = {
  'filter-default': () => pictures.slice(),
  'filter-random': () => shuffle(pictures).slice(0, RANDOM_PICTURES_NUMBER),
  'filter-discussed': () => {
    const discussedPhotos = pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
    return discussedPhotos;
  },
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const buttonClick = debounce((evt) => {
  const selected = imgFiltersForm.querySelector('.img-filters__button--active');
  if (selected) {
    selected.classList.remove('img-filters__button--active');
  }

  evt.target.classList.add('img-filters__button--active');
  removePhotos();
  getPhotos(allFilters[evt.target.id]());
}, DELAY);

filterButtons.forEach((button) => {
  button.addEventListener('click', buttonClick);
});

export {getPhotos, closePictureEsc, removePhotos};
