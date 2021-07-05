const inputUpload = document.querySelector('input');
const photoEdit = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgForm = document.querySelector('.img-upload__form');

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

const commentsInput = document.querySelector('.text__description');
const hashtagInput = document.querySelector('.text__hashtags');

function checkHashtags(input){
  const inputTags = input.value.split(' ').map((value)=> value.toLowerCase());
  const hashtagRegexCheck = (text)=>  /^#[A-Za-zA-Яа-я0-9]{1,19}$/.test(text);

  if(input.value.length === 0){
    return true;
  }

  if(inputTags.length > 5){
    input.setCustomValidity('Введите не более 5 хэштегов');
    return false;
  }

  if(new Set(inputTags).size !== inputTags.length){
    input.setCustomValidity('Нельзя использовать одинаковые хештеги');
    return false;
  }

  return inputTags.every(hashtagRegexCheck);
}

function checkHomments(input){
  if(input.value.length === 0){
    return true;
  }

  if(input.value.length > 140){
    input.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    return false;
  }
}

imgForm.addEventListener('submit', (evt)=> {
  evt.preventDefault();
  checkHashtags(hashtagInput);
  checkHomments(commentsInput);
});
