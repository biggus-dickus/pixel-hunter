import getElementFromTemplate from '../../utils/get-element-from-template';

// TODO: <li>'s with stats are inserted consecutively, change their order to reflect user actions
export default (state) => {
  return getElementFromTemplate(`<ul class="stats">
            ${new Array(state.fastAnswers).fill(`<li class="stats__result stats__result--fast"></li>`).join(``)}
            ${new Array(state.slowAnswers).fill(`<li class="stats__result stats__result--slow"></li>`).join(``)}
            ${new Array(state.incorrectAnswers).fill(`<li class="stats__result stats__result--wrong"></li>`).join(``)}
            ${new Array(state.correctAnswers).fill(`<li class="stats__result stats__result--correct"></li>`).join(``)}
            ${new Array(state.gamesTotal - state.gameNumber).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
          </ul>`);
};
