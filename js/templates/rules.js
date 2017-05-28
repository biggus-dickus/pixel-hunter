import getElementFromTemplate from '../getElementFromTemplate.js';
import insertTemplate from '../insertTemplate.js';
import game1 from './game-1.js';

const template = getElementFromTemplate(`
  <header class="header">
    <div class="header__back">
      <span class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.png" width="101" height="44">
      </span>
    </div>
  </header>
  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше имя" required>
      <button class="rules__button  continue" disabled>Go!</button>
    </form>
  </div>`);


const form = template.querySelector(`.rules__form`);
const submit = template.querySelector(`.rules__button`);

form.addEventListener(`input`, () => {
  submit.disabled = !form.checkValidity();
});

form.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  insertTemplate(game1);
});


export default template;
