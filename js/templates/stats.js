import {rates} from '../data/gamedata';
import getElementFromTemplate from '../utils/get-element-from-template';
import renderBackBtn from './partials/back-to-start';
import getResults from '../utils/calculate-score';


export default (state) => {
  const results = getResults(state);

  const template = getElementFromTemplate(`<header class="header"></header>
    <div class="result">
      <h1>${results.caption}</h1>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
            <ul class="stats">
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--correct"></li>
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--unknown"></li>
            </ul>
          </td>
          <td class="result__points">×&nbsp;${rates.correctAnswerPoints}</td>
          <td class="result__total">${results.correctPoints}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${state.fastAnswers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;${rates.fastAnswerPoints}</td>
          <td class="result__total">${results.fastPoints}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${state.lives}&nbsp;<span class="stats__result stats__result--heart"></span></td>
          <td class="result__points">×&nbsp;${rates.lifeBonusPoints}</td>
          <td class="result__total">${results.lifeBonusPoints}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${state.slowAnswers}&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;${rates.slowAnswerPoints}</td>
          <td class="result__total">${results.slowPokePoints}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${results.total}</td>
        </tr>
      </table>
    </div>`);

  const header = template.querySelector(`.header`);

  header.insertBefore(renderBackBtn(), header.childNodes[0]);

  return template;
};
