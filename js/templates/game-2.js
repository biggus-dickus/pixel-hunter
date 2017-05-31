import getElementFromTemplate from '../get-element-from-template';
import insertTemplate from '../insert-template';
import goBackTemplate from '../back-to-start';
import greeting from './greeting';
import game3 from './game-3';

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
      <p class="game__task">Угадай, фото или рисунок?</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="//placehold.it/705x455" alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input name="question1" type="radio" value="photo" required>
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--wide  game__answer--paint">
            <input name="question1" type="radio" value="paint" required>
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
          <li class="stats__result stats__result--wrong"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--slow"></li>
          <li class="stats__result stats__result--unknown"></li>
          <li class="stats__result stats__result--fast"></li>
          <li class="stats__result stats__result--unknown"></li>
        </ul>
      </div>
    </div>`);

  const btnBack = template.querySelector(`.header__back`);
  const form = template.querySelector(`.game__content`);

  btnBack.addEventListener(`click`, () => insertTemplate(greeting()));

  form.addEventListener(`change`, () => {
    if (form.checkValidity()) {
      insertTemplate(game3());
      form.reset();
    }
  });

  return template;
};


export default renderTemplate;
