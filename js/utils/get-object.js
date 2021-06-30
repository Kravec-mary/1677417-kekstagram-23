const COUNT = 25;
const MAX_COMMENTS = 5;
const COMMENTS_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const COMMENTS_NAME = [
  'Артём',
  'Мила',
  'Никита',
  'Олеся',
  'Святослав',
  'Кирилл',
];

const COMMENTS_AVATAR = [
  'img/avatar-1.svg',
  'img/avatar-2.svg',
  'img/avatar-3.svg',
  'img/avatar-4.svg',
  'img/avatar-5.svg',
  'img/avatar-6.svg',
];

const Likes = {  // enum
  MIN: 15,
  MAX: 200,
};

const Id = {
  MIN: 1,
  MAX: 100,
};

const DEDCRIPTION_PHOTO = 'Это мой первый пост в кекстаграме';

const photos = [];


const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.round(Math.random() * (max - min)) + min;
};

const addComments = () => {
  const comments = [];

  for (let i = 0; i < getRandomInt(0, MAX_COMMENTS); i++) {
    comments.push({
      id: getRandomInt(Id.MIN, Id.MAX),
      avatar: COMMENTS_AVATAR[getRandomInt(0, COMMENTS_AVATAR.length -1)],
      message: COMMENTS_MESSAGE[getRandomInt(0, COMMENTS_MESSAGE.length -1)],
      name: COMMENTS_NAME[getRandomInt(0, COMMENTS_NAME.length - 1)],
    });
  }

  return comments;
};

const addPhoto = (index) => ({
  id: index,
  url: `photos/${index + 1}.jpg`,
  description: DEDCRIPTION_PHOTO,
  likes: getRandomInt(Likes.MIN, Likes.MAX),
  comments: addComments(),
});

const addPhotos = () => {
  for (let i = 0; i < COUNT; i++) {
    photos.push(addPhoto(i));
  }
};
addPhotos();

export {photos};
