import getElementFromTemplate from '../get-element-from-template';
import insertTemplate from '../insert-template';
import renderGame1 from './game-1';
import renderBackBtn from './partials/back-to-start';

export default () => {
  const template = getElementFromTemplate(`
    <header class="header"></header>
    <div class="rules">
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай 10 раз для каждого изображения, фото это <img
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

  const header = template.querySelector(`.header`);
  const form = template.querySelector(`.rules__form`);
  const submit = template.querySelector(`.rules__button`);

  header.insertBefore(renderBackBtn(), header.childNodes[0]);

  form.addEventListener(`input`, () => {
    submit.disabled = !form.checkValidity();
  });

  form.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    insertTemplate(renderGame1());
    form.reset();
  });

  return template;
};
