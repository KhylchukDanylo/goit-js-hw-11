export const fetchApi = async (name, page) => {
  const result = await fetch(
    `https://pixabay.com/api/?key=30766207-c21e484b4ae94f3d1db76faf9&q=${name}&images_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  const images = await result.json();
  return images;
};
