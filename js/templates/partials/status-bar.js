import AbstractView from '../../utils/abstract-view';


class StatusBarView extends AbstractView {
  constructor(state) {
    super();
    this._state = state;
  }

// TODO: <li>'s with stats are inserted consecutively, change their order to reflect user actions
  get template() {
    return `<ul class="stats">
              ${new Array(this._state.fastAnswers).fill(`<li class="stats__result stats__result--fast"></li>`).join(``)}
              ${new Array(this._state.slowAnswers).fill(`<li class="stats__result stats__result--slow"></li>`).join(``)}
              ${new Array(this._state.incorrectAnswers).fill(`<li class="stats__result stats__result--wrong"></li>`).join(``)}
              ${new Array(this._state.correctAnswers).fill(`<li class="stats__result stats__result--correct"></li>`).join(``)}
              ${new Array(this._state.gamesTotal - this._state.gameNumber).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
            </ul>`;
  }
}

export default (state) => {
  const statusBar = new StatusBarView(state);

  return statusBar.element;
};
