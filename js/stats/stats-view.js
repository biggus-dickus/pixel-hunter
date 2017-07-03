import {rates, recordedAnswers, SLOW_ANSWER_FLAG, FAST_ANSWER_FLAG, CORRECT_ANSWER_FLAG} from '../data/gamedata';
import AbstractView from '../view';
import renderBackBtn from '../partials/back-to-start';
import renderStatusBar from '../partials/status-bar';
import getResults from '../utils/calculate-score';


export default class StatsView extends AbstractView {
  constructor(state) {
    super();
    this._state = state;
  }

  insertPlayerName() {
    if (this._state.playerName && this._state.serverStats) {
      return `<p>Статистика по&nbsp;пользователю: ${this._state.playerName}</p>`;
    }

    return ``;
  }

  get template() {
    // We show the last successful game for certain player only if statistics was directly accessed via URL (e. g. origin/#stats=Vasya).
    // In all other cases we render stats based on local data.
    const stats = (this._state.serverStats) ? this._state.serverStats[this._state.serverStats.length - 1].stats : recordedAnswers;

    const fastAnswersCount = stats.filter((answer) => answer === FAST_ANSWER_FLAG).length;
    const regularSpeedAnswersCount = stats.filter((answer) => answer === CORRECT_ANSWER_FLAG).length;
    const slowAnswersCount = stats.filter((answer) => answer === SLOW_ANSWER_FLAG).length;

    this._state.correctAnswers = regularSpeedAnswersCount + fastAnswersCount + slowAnswersCount;
    this._state.slowAnswers = slowAnswersCount;
    this._state.fastAnswers = fastAnswersCount;
    this._state.lives = (this._state.serverStats) ? this._state.serverStats[this._state.serverStats.length - 1].lives : this._state.lives;


    const results = getResults(this._state);

    return `<header class="header"></header>
      <div class="result">
        <h1>${results.caption}</h1>
        ${this.insertPlayerName()}
        <table class="result__table">
          <tr>
            <td class="result__number">1.</td>
            <td colspan="2" id="stats-td"></td>
            <td class="result__points">×&nbsp;${rates.correctAnswerPoints}</td>
            <td class="result__total">${results.correctPoints}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за&nbsp;скорость:</td>
            <td class="result__extra">${this._state.fastAnswers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
            <td class="result__points">×&nbsp;${rates.fastAnswerPoints}</td>
            <td class="result__total">${results.fastPoints}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за&nbsp;жизни:</td>
            <td class="result__extra">${this._state.lives}&nbsp;<span class="stats__result stats__result--heart"></span></td>
            <td class="result__points">×&nbsp;${rates.lifeBonusPoints}</td>
            <td class="result__total">${results.lifeBonusPoints}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Штраф за&nbsp;медлительность:</td>
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

    // TODO: fix status dots issue for server stats, get rid of recordedAnswers
    header.insertBefore(renderBackBtn(), header.childNodes[0]);
    statsContainer.appendChild(renderStatusBar(this._state));
  }
}
