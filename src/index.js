import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchApi } from './js/fetch';

const subBtn = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const guard = document.querySelector('#scrollArea');

subBtn.addEventListener('submit', onSubmit);

let page = 1;
let totalSymImage = 0;

let options = {
  root: null,
  rootMargin: '300px',
  threshold: 0.7,
};

let observer = new IntersectionObserver(onLoad, options);

function onLoad(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      importElm();
    }
  });
}

function onSubmit(evt) {
  evt.preventDefault();
  zeroing();
  importElm();
}

function zeroing() {
  gallery.innerHTML = '';
  page = 1;
  totalSymImage = 0;
}

function importElm() {
  const textSearchs = subBtn[0].value;

  fetchApi(textSearchs, page)
    .then(result => creatElmHtml(result))

    .catch(err =>
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      )
    );
}

function creatElmHtml(objImages) {
  if (objImages.total === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    throw new Error(response.status);
  } else if (totalSymImage >= objImages.totalHits) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    throw new Error(response.status);
  } else if (page === 1) {
    Notiflix.Notify.success(`Hooray! We found ${objImages.totalHits} images.`);
  }

  const arrObjElm = objImages.hits;
  totalSymImage += arrObjElm.length;

  const markup = [];

  arrObjElm.map(element =>
    markup.push(
      `<a class="gallery__item" onclick="event.preventDefault()"
     href="${element.largeImageURL}">
     <div class="photo-card">
      <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy"/>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
      ${element.likes}
        </p>
        <p class="info-item">
          <b>Views</b>
      ${element.views}
        </p>
        <p class="info-item">
          <b>Comments</b>
    ${element.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
    ${element.downloads}
        </p>
      </div>
    </div>
    </a>`
    )
  );

  addElmHtml(markup.join(' '));
}

function addElmHtml(arr) {
  gallery.insertAdjacentHTML('beforeend', arr);
  page++;
  observer.observe(guard);
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 0.7,
});

const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
