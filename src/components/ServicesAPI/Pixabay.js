const URL = 'https://pixabay.com/api/';
const KEY = '30572084-069004b26a8a8f55c86a46c9c';
const PARAMS = '&image_type=photo&orientation=horizontal&per_page=12';

function fetchImages(query, page = 1) {
  return fetch(`${URL}?key=${KEY}&q=${query}${PARAMS}&page=${page}`).then(
    response => response.json()
  );
}

export default fetchImages;
