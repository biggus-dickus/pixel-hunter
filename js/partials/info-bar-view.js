import {MAX_LIVES} from '../data/gamedata';
import AbstractView from '../view';
import setTimer from '../utils/timer';
import renderBackBtn from './back-to-start';


export default class InfoBarView extends AbstractView {
  constructor(state) {
    super();
    this._state = state;
  }

  get template() {
    return `<header class="header">
      <h1 class="game__timer">${this._state.time}</h1>
      <div class="game__lives">
        ${new Array(MAX_LIVES - this._state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Empty life">`).join(``)}
        ${new Array(this._state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life">`).join(``)}
      </div>
    </header>`;
  }

  bind() {
    const header = this.element.querySelector(`.header`);
    const timerElem = this.element.querySelector(`.game__timer`);

    header.insertBefore(renderBackBtn(), header.childNodes[0]);

    setTimer(timerElem);
  }
}
