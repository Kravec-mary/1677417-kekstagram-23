const getRandom = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.round(Math.random() * (max - min)) + min;
};

getRandom (1, 9);

const checkLengthLine = (line, length) => (line.length <= length);

checkLengthLine('Проверка длины строки', 140);



const ID = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ];

const URL = [
  'photos/1.jpg',
  'photos/2.jpg',
  'photos/3.jpg',
  'photos/4.jpg',
  'photos/5.jpg',
  'photos/6.jpg',
  'photos/7.jpg',
  'photos/8.jpg',
  'photos/9.jpg',
  'photos/10.jpg',
  'photos/11.jpg',
  'photos/12.jpg',
  'photos/13.jpg',
  'photos/14.jpg',
  'photos/15.jpg',
  'photos/16.jpg',
  'photos/17.jpg',
  'photos/18.jpg',
  'photos/19.jpg',
  'photos/20.jpg',
  'photos/21.jpg',
  'photos/22.jpg',
  'photos/23.jpg',
  'photos/24.jpg',
  'photos/25.jpg',
];

const DESCRIPTION = [
  'Пляж с лежаками и белой галькой',
  'Как пройти к пляжу',
  'Райский пейзаж: лазурная водичка, белый песок и камни',
  'Я уже здесь успела загореть',
  'Попробуй съешь нас',
  'Вот такие премиальные машины теперь в каршеринге!',
  'Мой завтрак',
  'Собрала с грядки смородину и сделала морс, вкусно!',
  'Смотрите, как я могу',
  'Компактно и удобно',
  'Сад на песчаном береге',
  'Моя новая тачка',
  'Легкий прекрасный ужин в кругу семьи',
  'Съешь меня!',
  'Когда очень мерзнут ножки',
  'А из окна, из окна из окна видишь ты...',
  'Выступление оркестра в Москве, сегодня в 19:00, приходите!',
  'Люблю красный цвет',
  'Тапочки-лунаточки, очень удобно',
  'Резорт Океанспа',
  'Новое блюдо: салат с соевым мясом',
  'Sunset',
  'Мой новый домашний питомец',
  'Мы на концерте, всем пис',
  'Сафари по Танзании',
];

const getRandomLikes = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.round(Math.random() * (max - min)) + min;
};

getRandomLikes (15, 200);


const COMMENTS_AVATAR = [
  'img/avatar-1.svg',
  'img/avatar-2.svg',
  'img/avatar-3.svg',
  'img/avatar-4.svg',
  'img/avatar-5.svg',
  'img/avatar-6.svg',
];

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

const getRandomArrayElement = (elements) => {
  return elements[_.random(0, elements.length - 1)];
};

const getComments = () => {
 return {
   id: const getRandomCommentsId = (min, max) => {
    if (min < 0 || max < 0) {
      return -1;
    }

    if (min > max) {
      [min, max] = [max, min];
    }

    return Math.round(Math.random() * (max - min)) + min;
  };

  getRandomCommentsId (100, 300);

   avatar: getRandomArrayElement(COMMENTS_AVATAR),
   message: getRandomArrayElement(COMMENTS_MESSAGE),
   name: getRandomArrayElement(COMMENTS_NAME),
  };
};

const newComments = [
  getComments(),
];
