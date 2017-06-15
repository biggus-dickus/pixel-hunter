import {initialState} from '../data/gamedata';
import getElementFromTemplate from '../utils/get-element-from-template';
import insertTemplate from '../utils/insert-template';
import renderRules from './rules';
import renderStats from './stats';


export default () => {
  const template = getElementFromTemplate(`
    <div class="greeting central--blur">
      <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
        <h1 class="greeting__asterisk">*</h1>
        <div class="greeting__challenge">
          <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
          <p>Правила игры просты.<br>
          Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
          Задача кажется тривиальной, но не думай, что всё так просто.<br>
          Фотореализм обманчив и коварен.<br>
          Помни, главное — смотреть очень внимательно.</p>
        </div>
      <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
    </div>
    <a href="#" class="greeting__link">Лучшие результаты</a>`);

  const proceedBtn = template.querySelector(`.greeting__continue`);
  const statsBtn = template.querySelector(`.greeting__link`);

  proceedBtn.addEventListener(`click`, () => insertTemplate(renderRules()));

  statsBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    insertTemplate(renderStats(initialState));
  });

  return template;
};
