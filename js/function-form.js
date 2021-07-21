import {request} from './fetch.js';
const DEFAULT_EFFECT_LEVEL = 100;

const Slider = {
  MAX: 100,
  MIN: 0,
  STEP: 1,
};

const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

const effectList = document.querySelector('.effects__list');
const photoEdit = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const closeButton = document.querySelector('.img-upload__cancel');
const formUpload = document.querySelector('.img-upload__form');
const fileUpload = document.querySelector('#upload-file');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderSection = document.querySelector('.img-upload__effect-level');
const valueElement = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview');
const image = imagePreview.querySelector('img');
const scaleControl = document.querySelector('.scale__control--value');

const hashtagInput = document.querySelector('.text__hashtags');
const effects = {
  none: () => {
    sliderSection.classList.add('visually-hidden');
    return 'none';
  },
  chrome: () => {
    sliderSection.classList.remove('visually-hidden');
    return `grayscale(${parseInt(valueElement.value, 10) * 0.01})`;
  },
  sepia: () => {
    sliderSection.classList.remove('visually-hidden');
    return `sepia(${parseInt(valueElement.value, 10) * 0.01})`;
  },
  marvin: () => {
    sliderSection.classList.remove('visually-hidden');
    return `invert(${Math.floor(valueElement.value)}%)`;
  },
  phobos: () => {
    sliderSection.classList.remove('visually-hidden');
    return `blur(${(parseInt(valueElement.value, 10) * 3) * 0.01}px)`;
  },
  heat: () => {
    sliderSection.classList.remove('visually-hidden');
    return `brightness(${(parseInt(valueElement.value, 10) * 3) * 0.01})`;
  },
};

valueElement.value = DEFAULT_EFFECT_LEVEL;
let lastClass = '';

effectList.addEventListener('click', (evt) => {
  let target = evt.target;

  if (target.classList.contains('effects__label')) {
    target = evt.target.querySelector('span');
  }

  if (target.classList.contains('effects__preview')) {
    if (lastClass !== '') {
      image.classList.remove(lastClass);
    }

    sliderElement.noUiSlider.set(Slider.MAX);
    valueElement.value = Slider.MAX;

    lastClass = target.classList[1];
    image.classList.add(lastClass);
    image.style.filter = effects[lastClass.replace('effects__preview--', '')]();
  }
});

// закрытие формы
const closeForm = () => {
  photoEdit.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  imagePreview.style.transform = '';
  imagePreview.className = 'img-upload__preview';
  imagePreview.style.filter = 'none';
  formUpload.reset();
};

const onCloseFormEscKeyDown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closeForm();
    document.removeEventListener('keydown', onCloseFormEscKeyDown);
    evt.preventDefault();
    closeForm();
  }
};

fileUpload.addEventListener('change', (evt) => {
  evt.preventDefault();
  photoEdit.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  imagePreview.style.filter = effects.none();
  document.addEventListener('keydown', onCloseFormEscKeyDown);
});


closeButton.addEventListener('click', () => {
  closeForm();
});

//проверка хештегов

hashtagInput.addEventListener('input', () => {
  const invalidMessage = [];
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
    invalidMessage.push('Хештег должен начинаться с символа #');
  }

  const isOnlyLatticeHashtag = inputArray.some((item) => item === '#');

  if (isOnlyLatticeHashtag) {
    invalidMessage.push('Хештег не может состоять из одной решетки');
  }

  const isSplitSpaceHastag = inputArray.some((item) => item.indexOf('#', 1) >= 1);

  if (isSplitSpaceHastag) {
    invalidMessage.push('Хештеги разделяются пробелами');
  }

  const isRepeatHashtag = inputArray.some((item, i, arr)=> arr.indexOf(item, i + 1) >= i + 1);

  if (isRepeatHashtag) {
    hashtagInput.setCustomValidity('Нельзя использовать одинаковые хештеги');
  }

  const isLongHashtag = inputArray.some((item) => item.length > MAX_SYMBOLS);

  if (isLongHashtag) {
    invalidMessage.push('Максимальная длина хештега 20 символов, включая решетку');
  }

  if (inputArray.length > MAX_HASHTAGS) {
    invalidMessage.push('Нельза указывать больше 5 хештегов');
  }
  if (invalidMessage.length > 0) {
    hashtagInput.setCustomValidity(invalidMessage.join('.\n'));
    hashtagInput.style.border = '2px solid #E32636';
  } else {
    hashtagInput.style.border = 'none';
  }
});

//масштаб

const more = document.querySelector('.scale__control--bigger'); // кнопка плюс
const less = document.querySelector('.scale__control--smaller'); // кнопка минус

const Zoom = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
};

less.addEventListener('click', () => {
  let size = parseInt(scaleControl.value, 10);

  if (size === Zoom.MIN) {
    return;
  }
  size -= Zoom.STEP;
  scaleControl.value = `${size}%`;
  imagePreview.style.transform = `scale(${size / 100})`;
});

more.addEventListener('click', () => {
  let size = parseInt(scaleControl.value, 10);

  if (size === Zoom.MAX) {
    return;
  }
  size += Zoom.STEP;
  scaleControl.value = `${size}%`;
  imagePreview.style.transform = `scale(${size / 100})`;
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

//сообщение

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');


const closePopupMessage = () => {
  const popupMessage = document.querySelector('.error') || document.querySelector('.success');
  popupMessage.remove();
};

const onMessageEscKeydown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closePopupMessage();
  }
};

const onDocumentClick = () => {
  closePopupMessage();
  document.removeEventListener('keydown', onMessageEscKeydown);
};

const showSuccessMessage = () => {
  const messageElement = successMessage.cloneNode(true);
  messageElement.addEventListener('click', onDocumentClick);
  bodyElement.appendChild(messageElement);
  document.addEventListener('keydown', onMessageEscKeydown, {once: true});
};

const showErrorMessage = () => {
  const messageElement = errorMessage.cloneNode(true);
  messageElement.addEventListener('click', onDocumentClick);
  bodyElement.appendChild(messageElement);
  document.addEventListener('keydown', onMessageEscKeydown, {once: true});
};

formUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(formUpload);
  const onSuccess = () => {
    closeForm();
    showSuccessMessage();
  };
  const onError = () => {
    showErrorMessage();
  };
  request(onSuccess, onError, 'POST', formData);
});
