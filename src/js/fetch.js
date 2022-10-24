import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const key = '30766207-c21e484b4ae94f3d1db76faf9';
const per_page = 40;

export const fetchApi = async (name, page) => {
  const result = await axios.get(
    `${BASE_URL}?key=${key}&q=${name}&images_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
  );
  return result.data;
};
