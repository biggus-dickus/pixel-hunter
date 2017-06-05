import gamedata from '../gamedata';
import getElementFromTemplate from '../get-element-from-template';
import insertTemplate from '../insert-template';
import renderStats from './stats';
import renderInfoBar from './partials/info-bar';
import statusBar from './partials/status-bar';


export default () => {
  const template = getElementFromTemplate(`
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
      ${statusBar}
    </div>`);

  template.insertBefore(renderInfoBar(gamedata), template.childNodes[0]);

  const form = template.querySelector(`.game__content`);
  form.addEventListener(`click`, () => insertTemplate(renderStats()));

  return template;
};
