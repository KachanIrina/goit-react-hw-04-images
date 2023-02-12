import axios from 'axios';

const params = {
  key: '31911366-3437357826fd249fe2002a201',
  options: '&image_type=photo&orientation-horisontal&safesearch-true',
};
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImages(query, page) {
  const resp = await axios.get(
    `?key=${params.key}&q=${query}${params.options}&per_page=12&page=${page}`
  );
  return resp.data;
}
