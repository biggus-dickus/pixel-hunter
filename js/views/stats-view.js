import {rates} from '../data/gamedata';
import AbstractView from '../views/abstract-view';
import renderBackBtn from '../containers/back-to-start';
import renderStatusBar from '../containers/status-bar';
import getResults from '../utils/calculate-score';


export default class StatsView extends AbstractView {
  constructor(state) {
    super();
    this._state = state;
  }

  get template() {
    const results = getResults(this._state);

    return `<header class="header"></header>
      <div class="result">
        <h1>${results.caption}</h1>
        <table class="result__table">
          <tr>
            <td class="result__number">1.</td>
            <td colspan="2" id="stats-td"></td>
            <td class="result__points">×&nbsp;${rates.correctAnswerPoints}</td>
            <td class="result__total">${results.correctPoints}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за скорость:</td>
            <td class="result__extra">${this._state.fastAnswers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
            <td class="result__points">×&nbsp;${rates.fastAnswerPoints}</td>
            <td class="result__total">${results.fastPoints}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за жизни:</td>
            <td class="result__extra">${this._state.lives}&nbsp;<span class="stats__result stats__result--heart"></span></td>
            <td class="result__points">×&nbsp;${rates.lifeBonusPoints}</td>
            <td class="result__total">${results.lifeBonusPoints}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Штраф за медлительность:</td>
            <td class="result__extra">${this._state.slowAnswers}&nbsp;<span class="stats__result stats__result--slow"></span></td>
            <td class="result__points">×&nbsp;${rates.slowAnswerPoints}</td>
            <td class="result__total">${results.slowPokePoints}</td>
          </tr>
          <tr>
            <td colspan="5" class="result__total  result__total--final">${results.total}</td>
          </tr>
        </table>
      </div>`;
  }

  bind() {
    const header = this.element.querySelector(`.header`);
    const statsContainer = this.element.getElementById(`stats-td`);

    header.insertBefore(renderBackBtn(), header.childNodes[0]);
    statsContainer.appendChild(renderStatusBar(this._state));
  }
}
