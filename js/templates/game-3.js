import getElementFromTemplate from '../get-element-from-template';
import insertTemplate from '../insert-template';
import goBackTemplate from '../back-to-start';
import greeting from './greeting';
import stats from './stats';

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
      <p class="game__task">Найдите рисунок среди изображений</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="//placehold.it/304x455" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option  game__option--selected">
          <img src="//placehold.it/304x455" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option">
          <img src="//placehold.it/304x455" alt="Option 1" width="304" height="455">
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
  const answers = template.querySelectorAll(`.game__content .game__option`);

  btnBack.addEventListener(`click`, () => insertTemplate(greeting()));

  for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener(`click`, () => insertTemplate(stats()));
  }

  return template;
};


export default renderTemplate;
