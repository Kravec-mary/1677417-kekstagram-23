import {closePictureEsc} from './make-miniature.js';

const COMMENTS_LOAD = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const pictureCancel = document.querySelector('.big-picture__cancel');
const pictureCaption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');

const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoad = bigPicture.querySelector('.comments-loader');

let commentsCount = COMMENTS_LOAD;
let currentComments = [];

const addComments = () => {
  socialComments.innerHTML = '';

  commentsCount = (commentsCount > currentComments.length) ? currentComments.length : commentsCount;

  const commentsSelected = currentComments.slice(0, commentsCount);

  if (currentComments.length <= COMMENTS_LOAD || commentsCount >= currentComments.length) {
    commentsLoad.classList.add('hidden');
  } else {
    commentsLoad.classList.remove('hidden');
  }

  socialCommentsCount.textContent = `${commentsCount} из ${currentComments.length} комментариев`;

  const commentFragment = document.createDocumentFragment();

  commentsSelected.forEach((comment) => {
    const newComment = document.createElement('li');
    const imgComment = document.createElement('img');
    const textComment = document.createElement('p');
    newComment.classList.add('social__comment');
    imgComment.classList.add('social__picture');
    textComment.classList.add('social__text');
    imgComment.src = comment.avatar;
    imgComment.alt = comment.name;
    textComment.textContent = comment.message;
    newComment.appendChild(imgComment);
    newComment.appendChild(textComment);

    commentFragment.appendChild(newComment);
  });

  socialComments.appendChild(commentFragment);
};

const onloadCommentsButtonClick = () => {
  commentsCount += COMMENTS_LOAD;
  addComments();
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsCount = COMMENTS_LOAD;
  currentComments = [];
  document.removeEventListener('keydown', closePictureEsc);
  commentsLoad.removeEventListener('click', onloadCommentsButtonClick);
};

const closePopup = () => {
  closeBigPicture();
  pictureCancel.removeEventListener('click', closePopup);
};


const showBigPicture = (url, comments, likes, description) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  pictureCaption.textContent = description;

  currentComments = comments;
  addComments();

  commentsLoad.addEventListener('click', onloadCommentsButtonClick);
  pictureCancel.addEventListener('click', closePopup);
};

export {showBigPicture, closeBigPicture, closePopup};
