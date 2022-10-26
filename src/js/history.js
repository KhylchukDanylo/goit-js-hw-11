import Notiflix from 'notiflix';
import { zeroing } from '../index';

const btnStory = document.querySelector('.form__story');
const menuStory = document.querySelector('.history');
const formInput = document.querySelector('#search-form');
const btnSum = document.querySelector('.form__btn');

const modalCont = document.querySelector('.modal');
const body = document.querySelector('body');

btnStory.addEventListener('click', onClickStory);
modalCont.addEventListener('click', onClockTextStory);

function onClockTextStory(evt) {
  if (evt.target.nodeName === 'P' || evt.target.nodeName === 'LI') {
    formInput[0].value = evt.target.textContent;
    btnSum.removeAttribute('disabled');
    modalCont.classList.add('visually-hidden');
    body.classList.remove('noScroll');
  } else if (evt.target.nodeName === 'DIV') {
    modalCont.classList.add('visually-hidden');
    body.classList.remove('noScroll');
  }
}

function onClickStory(evt) {
  evt.preventDefault();
  if (!GGG()) {
    Notiflix.Notify.failure(' History is empty');
    return;
  }
  menuStory.innerHTML = '';
  body.classList.add('noScroll');
  menuStory.classList.remove('visually-hidden');
  modalCont.classList.remove('visually-hidden');
  getStory();
}

function GGG() {
  let truFal = true;
  for (let i = 0; i < 10; i++) {
    if (localStorage.getItem(`story${i}`) === null) {
      truFal = false;
    } else {
      return true;
    }
  }
  return truFal;
}

function getStory() {
  const arrStory = [];

  for (let i = 0; i <= 10; i++) {
    const g = localStorage.getItem(`story${i}`);
    if (g !== null) {
      arrStory.push(g);
    }
  }
  creatElmHtml(arrStory);
}

function creatElmHtml(arrStory) {
  const markup = [];

  arrStory.map(element =>
    markup.push(
      `<ul class="list__story">
        <li class="item__story"><p class="text__story">${element}</p></li>
      </ul>`
    )
  );

  addElmHtml(markup.join(' '));
}

function addElmHtml(arrElm) {
  menuStory.insertAdjacentHTML('beforeend', arrElm);
}
