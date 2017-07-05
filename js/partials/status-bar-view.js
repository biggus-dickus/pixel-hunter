import {views, CORRECT_ANSWER_FLAG, INCORRECT_ANSWER_FLAG, SLOW_ANSWER_FLAG, FAST_ANSWER_FLAG} from '../data/gamedata';
import AbstractView from '../view';

const statsMarkup = new Map([
  [CORRECT_ANSWER_FLAG, `<li class="stats__result stats__result--correct"></li>`],
  [INCORRECT_ANSWER_FLAG, `<li class="stats__result stats__result--wrong"></li>`],
  [SLOW_ANSWER_FLAG, `<li class="stats__result stats__result--slow"></li>`],
  [FAST_ANSWER_FLAG, `<li class="stats__result stats__result--fast"></li>`]
]);


export default class StatusBarView extends AbstractView {
  constructor(state, answers) {
    super();
    this._state = state;

    this._answersMarkup = answers.map((answer) => statsMarkup.get(answer));
  }

  _renderProgressBar() {
    if (this._state.template === views.game || this._state.lives === 0) {
      return new Array(this._state.gamesTotal - this._state.gameNumber).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``);
    }

    return ``;
  }

  get template() {
    return `<ul class="stats">
              ${this._answersMarkup.join(``)}
              ${this._renderProgressBar()}
              </ul>`;
  }
}
