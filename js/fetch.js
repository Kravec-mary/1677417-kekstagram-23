async function fetchPhotos(){
  return fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => data);
}

export {fetchPhotos};
