import {CORRECT_ANSWER_FLAG, INCORRECT_ANSWER_FLAG, SLOW_ANSWER_FLAG, FAST_ANSWER_FLAG, recordedAnswers, views} from '../../data/gamedata';
import AbstractView from '../abstract-view';

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

    this._answersMarkup = recordedAnswers.map((item) => statsMarkup.get(item));
  }

  get template() {
    return `<ul class="stats">
              ${this._answersMarkup.join(``)}
              ${this._renderRemainingSteps()}
            </ul>`;
  }

  _renderRemainingSteps() {
    if (this._state.template === views.game) {
      return new Array(this._state.gamesTotal - this._state.gameNumber).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``);
    }

    return null;
  }
}
