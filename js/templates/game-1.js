import getElementFromTemplate from '../get-element-from-template';
import insertTemplate from '../insert-template';
import goBackTemplate from '../back-to-start';
import greeting from './greeting';
import game2 from './game-2';

const renderTemplate = () => {
  const template = getElementFromTemplate(`
    <header class="header">
      ${goBackTemplate}
      <h1 class="game__timer">NN</h1>
      <div class="game__lives">
        <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">
        <img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">
        <img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">
      </div>
    </header>
    <div class="game">
        <p class="game__task">Угадайте для каждого изображения, фото это или рисунок?</p>
        <form class="game__content">
          <div class="game__option">
            <img src="//placehold.it/468x458" alt="Option 1" width="468" height="458">
            <label class="game__answer game__answer--photo">
              <input name="question1" type="radio" value="photo" required>
              <span>Фото</span>
            </label>
            <label class="game__answer game__answer--paint">
              <input name="question1" type="radio" value="paint" required>
              <span>Рисунок</span>
            </label>
          </div>
          <div class="game__option">
            <img src="//placehold.it/468x458" alt="Option 2" width="468" height="458">
            <label class="game__answer  game__answer--photo">
              <input name="question2" type="radio" value="photo" required>
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--paint">
              <input name="question2" type="radio" value="paint" required>
              <span>Рисунок</span>
            </label>
          </div>
        </form>
        <div class="stats">
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--unknown"></li>
          </ul>
        </div>
      </div>`);

  const btnBack = template.querySelector(`.header__back`);
  const form = template.querySelector(`.game__content`);

  btnBack.addEventListener(`click`, () => insertTemplate(greeting()));

  form.addEventListener(`change`, () => {
    if (form.checkValidity()) {
      insertTemplate(game2());
      form.reset();
    }
  });

  return template;
};


export default renderTemplate;
