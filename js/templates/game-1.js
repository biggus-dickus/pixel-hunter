import gamedata from '../gamedata';
import getElementFromTemplate from '../get-element-from-template';
import insertTemplate from '../insert-template';
import renderGame2 from './game-2';
import renderInfoBar from './partials/info-bar';
import statusBar from './partials/status-bar';

export default () => {
  const template = getElementFromTemplate(`
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
        ${statusBar}
      </div>`);

  template.insertBefore(renderInfoBar(gamedata), template.childNodes[0]);

  const form = template.querySelector(`.game__content`);

  form.addEventListener(`change`, () => {
    if (form.checkValidity()) {
      insertTemplate(renderGame2());
      form.reset();
    }
  });

  return template;
};
