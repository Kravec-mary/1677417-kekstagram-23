const DEFAULT_EFFECT_LEVEL = 100;

const Slider = {
  MAX: 100,
  MIN: 0,
  STEP: 1,
};

const effectList = document.querySelector('.effects__list');
const inputUpload = document.querySelector('input');
const photoEdit = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const closeButton = document.querySelector('.img-upload__cancel');
const uploadSubmit = document.querySelector('.img-upload__submit');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const image = document.querySelector('.img-upload__preview-image');

const MAX_SYMBOLS = 20;
const MAX_HASHTAG = 5;
const hashtagInput = document.querySelector('.text__hashtags');
//const sliderUi = document.querySelector('.img-upload__effect-level');
//const noneEffect = document.querySelector('#effect-none');

let lastClass = '';

const effects = {
  none: () => {
    sliderElement.classList.add('visually-hidden');
    return 'none';
  },
  chrome: () => {
    sliderElement.classList.remove('visually-hidden');
    return `grayscale(${parseInt(valueElement.value, 10) * 0.01})`;
  },
  sepia: () => {
    sliderElement.classList.remove('visually-hidden');
    return `sepia(${parseInt(valueElement.value, 10) * 0.01})`;
  },
  marvin: () => {
    sliderElement.classList.remove('visually-hidden');
    return `invert(${Math.floor(valueElement.value)}%)`;
  },
  phobos: () => {
    sliderElement.classList.remove('visually-hidden');
    return `blur(${(parseInt(valueElement.value, 10) * 3) * 0.01}px)`;
  },
  heat: () => {
    sliderElement.classList.remove('visually-hidden');
    return `brightness(${(parseInt(valueElement.value, 10) * 3) * 0.01})`;
  },
};

inputUpload.addEventListener('change', () => {
  photoEdit.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
});

effectList.addEventListener('click', (evt) => {
  let target = evt.target;

  if (target.classList.contains('effects__label')) {
    target = evt.target.querySelector('span');
  }

  if (target.classList.contains('effects__preview')) {
    if (lastClass !== '') {
      image.classList.remove(lastClass);
    }

    lastClass = target.classList[1];
    image.classList.add(lastClass);
    image.style.filter = '';
    sliderElement.noUiSlider.set(100);
  }
});

// закрытие формы
closeButton.addEventListener('click', () => {
  photoEdit.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (
    (evt.key === 'Escape' || evt.key === 'esc') &&
    !(evt.target.classList.contains('text__hashtags') || evt.target.classList.contains('text__description'))
  ) {
    evt.preventDefault();
    photoEdit.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
  }
});

//проверка хештегов
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

  const isLongHashtag = inputArray.some((item) => item.length > MAX_SYMBOLS);

  if (isLongHashtag) {
    hashtagInput.setCustomValidity('Максимальная длина хештега 20 символов, включая решетку');
  }

  if (inputArray.length > MAX_HASHTAG) {
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


noUiSlider.create(sliderElement, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX,
  },
  start: Slider.MAX,
  connect: 'lower',
});

sliderElement.noUiSlider.on('change', () => {
  valueElement.value = Math.round(sliderElement.noUiSlider.get());

  image.style.filter = effects[lastClass.replace('effects__preview--', '')]();
});

//отправка формы
