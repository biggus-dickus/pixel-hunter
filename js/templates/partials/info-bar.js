import getElementFromTemplate from '../../get-element-from-template';
import setTimer from '../../timer';
import renderBackBtn from './back-to-start';


export default (state) => {
  const MAX_LIVES = 3;

  const template = getElementFromTemplate(`<header class="header">
       <h1 class="game__timer">${state.time}</h1>
       <div class="game__lives">
          ${new Array(MAX_LIVES - state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Empty life">`).join(``)}
          ${new Array(state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life">`).join(``)}
       </div>
     </header>`);

  const header = template.querySelector(`.header`);
  const timerElem = template.querySelector(`.game__timer`);

  header.insertBefore(renderBackBtn(), header.childNodes[0]);

  setTimer(timerElem);

  return template;
};
