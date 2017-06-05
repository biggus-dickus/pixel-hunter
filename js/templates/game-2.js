import gamedata from '../gamedata';
import getElementFromTemplate from '../get-element-from-template';
import insertTemplate from '../insert-template';
import renderGame3 from './game-3';
import renderInfoBar from './partials/info-bar';
import statusBar from './partials/status-bar';


export default () => {
  const template = getElementFromTemplate(`
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
      ${statusBar}
    </div>`);

  template.insertBefore(renderInfoBar(gamedata), template.childNodes[0]);

  const form = template.querySelector(`.game__content`);

  form.addEventListener(`change`, () => {
    if (form.checkValidity()) {
      insertTemplate(renderGame3());
      form.reset();
    }
  });

  return template;
};
