const inputUpload = document.querySelector('input');
const photoEdit = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');

inputUpload.addEventListener('click', () => {
  inputUpload.setAttribute('type', '');
  photoEdit.classList.remove('hidden');
  body.classList.add('modal-open');
});

const closeButton = document.querySelector('.img-upload__cancel');

closeButton.addEventListener('click', () => {
  photoEdit.classList.add('hidden');
  body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (
    (evt.key === 'Escape' || evt.key === 'esc') &&
    !(evt.target.classList.contains('text__hashtags') || evt.target.classList.contains('text__description'))
  ) {
    evt.preventDefault();
    photoEdit.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});

const maxSymbols = 20;
const maxHashtag = 5;
const hashtagInput = document.querySelector('.text__hashtags');

hashtagInput.addEventListener('input', () => {
  hashtagInput.setCustomValidity('');

  const inputText = hashtagInput.value.toLowerCase().trim();

  if (!inputText) {
    return;
  }

  const inputArray = inputText.split(/\s+/);
  if (inputArray.length === 0) {
    return false;
  }

  const isStartNotHashtag = inputArray.some((item) => item[0] !=='#');

  if (isStartNotHashtag) {
    hashtagInput.setCustomValidity('Хештег должен начинаться с символа #');
  }

  const isOnlyLatticeHashtag = inputArray.some((item) => item === '#');

  if (isOnlyLatticeHashtag) {
    hashtagInput.setCustomValidity('Хештег не может состоять из одной решетки');
  }

  const isSplitSpaceHastag = inputArray.some((item) => item.indexOf('#', 1) >= 1);

  if (isSplitSpaceHastag) {
    hashtagInput.setCustomValidity('Хештеги разделяются пробелами');
  }

  const isRepeatHashtag = inputArray.some((item, i, arr)=> arr.indexOf(item, i + 1) >= i + 1);

  if (isRepeatHashtag) {
    hashtagInput.setCustomValidity('Нельзя использовать одинаковые хештеги');
  }

  const isLongHashtag = inputArray.some((item) => item.length > maxSymbols);

  if (isLongHashtag) {
    hashtagInput.setCustomValidity('Максимальная длина хештега 20 символов, включая решетку');
  }

  if (inputArray.length > maxHashtag) {
    hashtagInput.setCustomValidity('Нельза указывать больше 5 хештегов');
  }
});

const getValue = (str) => Number(str.replace(/%/, '')); // 55% -> 55 -> 55 number

//масштаб
const more = document.querySelector('.scale__control--bigger'); // кнопка плюс
const less = document.querySelector('.scale__control--smaller'); // кнопка минус
const scaleImage = document.querySelector('.img-upload__preview-image'); // скейл изображения
const step = 25;


less.addEventListener('click', () => {
  const inputValue = document.querySelector('.scale__control--value').value; // 25%
  const numberValue = getValue(inputValue); // 25
  const calculateValue = numberValue - step; // 0
  if (calculateValue === 0) {
    document.querySelector('.scale__control--value').value = `${numberValue  }%`;
    scaleImage.style.transform = `scale(${numberValue / 100})`;
  } else {
    document.querySelector('.scale__control--value').value = `${calculateValue  }%`;
    scaleImage.style.transform = `scale(${calculateValue / 100})`;
  }
});

more.addEventListener('click', () => {
  const inputValue = document.querySelector('.scale__control--value').value;
  const numberValue = getValue(inputValue); // 55
  const calculateValue = numberValue + step;
  if (calculateValue > 100) {
    document.querySelector('.scale__control--value').value = `${numberValue  }%`;
    scaleImage.style.transform = `scale(${numberValue / 100})`;
  } else {
    document.querySelector('.scale__control--value').value = `${calculateValue  }%`;
    scaleImage.style.transform = `scale(${calculateValue / 100})`;
  }
});

