import {CORRECT_ANSWER_FLAG, INCORRECT_ANSWER_FLAG, SLOW_ANSWER_FLAG, FAST_ANSWER_FLAG} from '../data/gamedata';
import AbstractView from '../view';

const statsMarkup = new Map([
  [CORRECT_ANSWER_FLAG, `<li class="stats__result stats__result--correct"></li>`],
  [INCORRECT_ANSWER_FLAG, `<li class="stats__result stats__result--wrong"></li>`],
  [SLOW_ANSWER_FLAG, `<li class="stats__result stats__result--slow"></li>`],
  [FAST_ANSWER_FLAG, `<li class="stats__result stats__result--fast"></li>`]
]);


export default class StatusBarView extends AbstractView {
  constructor(state) {
    super();
    this._state = state;

    this._answersMarkup = this._state.playerAnswers.map((answer) => statsMarkup.get(answer));
  }

  get template() {
    return `<ul class="stats">
              ${this._answersMarkup.join(``)}
              ${new Array(this._state.gamesTotal - this._state.gameNumber).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
            </ul>`;
  }
}
