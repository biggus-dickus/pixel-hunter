import {views, initialState} from '../data/gamedata';
import getElementFromTemplate from '../utils/get-element-from-template';
import insertTemplate from '../utils/insert-template';
import renderRules from './rules';
import renderStats from './stats';


export default (state) => {
  const template = getElementFromTemplate(`
    <div class="greeting central--blur">
      <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
        <h1 class="greeting__asterisk">*</h1>
        <div class="greeting__challenge">
          <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
          <p>Правила игры просты.<br>
          Нужно отличить рисунок&nbsp;от&nbsp;фотографии и&nbsp;сделать выбор.<br>
          Задача кажется тривиальной, но&nbsp;не&nbsp;думай, что всё так просто.<br>
          Фотореализм обманчив и&nbsp;коварен.<br>
          Помни, главное&nbsp;— смотреть очень внимательно.</p>
        </div>
      <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
    </div>
    <a href="#" class="greeting__link">Лучшие результаты</a>`);

  const proceedBtn = template.querySelector(`.greeting__continue`);
  const statsBtn = template.querySelector(`.greeting__link`);

  // Go to rules
  proceedBtn.addEventListener(`click`, () => {
    state = Object.assign({}, initialState, {
      template: views.rules
    });

    insertTemplate(renderRules(state));
  });

  // Go to stats
  statsBtn.addEventListener(`click`, (evt) => {
    state = Object.assign({}, initialState, {
      template: views.stats
    });

    evt.preventDefault();
    insertTemplate(renderStats(state));
  });

  return template;
};
