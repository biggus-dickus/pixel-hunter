import {rates, recordedAnswers, SLOW_ANSWER_FLAG, FAST_ANSWER_FLAG, CORRECT_ANSWER_FLAG} from '../data/gamedata';
import AbstractView from '../view';
import renderBackBtn from '../partials/back-to-start';
import renderStatusBar from '../partials/status-bar';
import getResults from '../utils/calculate-score';


export default class StatsView extends AbstractView {
  constructor(state) {
    super();
    this._state = state;
    this.caption = (this._state.lives > 0) ? `Победа!` : `POTRACHENO!`;
  }

  _insertCaption(caption) {
    if (this._state.playerName && this._state.serverStats) {
      return `Лучшие игры ${this._state.playerName}`;
    }

    return `${caption}`;
  }

  _insertTimeStamp(stamp) {
    if (this._state.playerName && this._state.serverStats) {
      return `<time>${stamp}</time>`;
    }

    return ``;
  }

  // TODO: enable direct transfer to stats
  _generateStatsLink() {
    if (this._state.victory) {
      return `<p>Поздравляем! Ваш результат будет доступен по&nbsp;<a href="${location.href}=${this._state.player}">этой ссылке</a>.</p>`;
    }

    return ``;
  }

  _renderStatsTable() {
    const tableMarkup = [];

    const stats = (this._state.serverStats) ? this._state.serverStats : [
      {lives: this._state.lives, stats: recordedAnswers}];

    for (let [i, item] of stats.entries()) {
      const fastAnswersCount = item.stats.filter((answer) => answer === FAST_ANSWER_FLAG).length;
      const regularSpeedAnswersCount = item.stats.filter((answer) => answer === CORRECT_ANSWER_FLAG).length;
      const slowAnswersCount = item.stats.filter((answer) => answer === SLOW_ANSWER_FLAG).length;

      this._state.correctAnswers = regularSpeedAnswersCount + fastAnswersCount + slowAnswersCount;
      this._state.slowAnswers = slowAnswersCount;
      this._state.fastAnswers = fastAnswersCount;
      this._state.lives = (this._state.serverStats) ? item.lives : this._state.lives;


      const results = getResults(this._state);

      tableMarkup.push(`${this._insertTimeStamp(new Date(item.date).toLocaleString(`ru`))}
<table class="result__table">
        <tr>
          <td class="result__number">${++i}.</td>
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
      </table>`);
    }

    return tableMarkup.join(``);
  }

  get template() {
    return `<header class="header"></header>
      <div class="result">
        <h1>${this._insertCaption(this.caption)}</h1>
        ${this._generateStatsLink()}
        ${this._renderStatsTable()}
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
