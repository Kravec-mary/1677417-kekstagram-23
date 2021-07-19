import {photos, addComments} from './utils/get-object.js';
import {fetchPhotos} from './fetch.js';


const photoTemplate = document.querySelector('#picture').content.querySelector('.picture'); //находим шаблон
const picturesContainer = document.querySelector('.pictures');

const renderPhoto = (photo) => { // {id: 1, url: `photos/1.jpg`, description: '', likes: '', comments: ''}
const photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.querySelector('img').setAttribute('id', photo.id);
  return photoElement;
};

const fragment = document.createDocumentFragment();

const renderPhotos = (data) => { // => [{id: 1, url: `photos/1.jpg`, description: '', likes: '', comments: ''}, {id: 2, url: `photos/2.jpg`, description: '', likes: '', comments: ''}]
  data.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo)); // {id: 1, url: `photos/1.jpg`, description: '', likes: '', comments: ''}
  });
  picturesContainer.appendChild(fragment);
};

const photosData = await fetchPhotos();
renderPhotos(photosData);

//полномасшатбное изображение

const someImage = document.querySelector('.picture__img');
const bigImage = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img');
const imgTest = bigPictureImage.querySelector('img');
const socialCommentCount = document.querySelector('.social__comment-count');
const socialLoader = document.querySelector('.comments-loader');
const bodyTeg = document.querySelector('body');
const closeButtonImage = document.querySelector('.big-picture__cancel');
const imageContainer = document.querySelector('.pictures');
const socialCaption = document.querySelector('.social__caption');


imageContainer.addEventListener('click',(event) =>  { // event - это объект, target - cвойство

  const likesCount = document.querySelector('.likes-count');
  const commentsCount = document.querySelector('.comments-count');
  likesCount.textContent = photosData[event.target.id].likes;
  commentsCount.textContent = photosData[event.target.id].comments.length;
  socialCaption.textContent = photosData[event.target.id].description;


  const comments = photosData[event.target.id].comments;
  const socialComments = document.querySelector('.social__comments');
  const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment'); // находим шаблон
  const commentElement = commentTemplate.cloneNode(true);


  for (let i = 0; i < comments.length; i++) {
    commentElement.querySelector('.social__picture').src = comments[i].avatar;
    commentElement.querySelector('.social__text').textContent = comments[i].message;
    socialComments.appendChild(commentElement);
  }

  bigImage.classList.remove('hidden');
  imgTest.src = photos[event.target.id].url;
  bodyTeg.classList.add('modal-open');
});

//закрытие окна

closeButtonImage.addEventListener('click', () => {
  bigImage.classList.add('hidden');
  bodyTeg.classList.remove('modal-open');

});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' || evt.key === 'esc') {
    bigImage.classList.add('hidden');
    bodyTeg.classList.remove('modal-open');
  }
});
