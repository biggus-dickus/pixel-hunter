import {CORRECT_ANSWER_FLAG, INCORRECT_ANSWER_FLAG, SLOW_ANSWER_FLAG, FAST_ANSWER_FLAG, recordedAnswers, views} from '../../data/gamedata';
import AbstractView from '../../utils/abstract-view';

const statsMarkup = new Map([
  [CORRECT_ANSWER_FLAG, `<li class="stats__result stats__result--correct"></li>`],
  [INCORRECT_ANSWER_FLAG, `<li class="stats__result stats__result--wrong"></li>`],
  [SLOW_ANSWER_FLAG, `<li class="stats__result stats__result--slow"></li>`],
  [FAST_ANSWER_FLAG, `<li class="stats__result stats__result--fast"></li>`]
]);


class StatusBarView extends AbstractView {
  constructor(state) {
    super();
    this._state = state;

    this.answersMarkup = recordedAnswers.map((item) => statsMarkup.get(item));
  }

  get template() {
    return `<ul class="stats">
              ${this.answersMarkup.join(``)}
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

export default (state) => {
  const statusBar = new StatusBarView(state);

  return statusBar.element;
};
