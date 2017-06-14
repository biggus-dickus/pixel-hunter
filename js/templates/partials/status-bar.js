import getElementFromTemplate from '../../get-element-from-template';


export default (state) => {
  return getElementFromTemplate(`<div class="stats">
          <ul class="stats">
            ${new Array(state.fastAnswers).fill(`<li class="stats__result stats__result--fast"></li>`).join(``)}
            ${new Array(state.slowAnswers).fill(`<li class="stats__result stats__result--slow"></li>`).join(``)}
            ${new Array(state.incorrectAnswers).fill(`<li class="stats__result stats__result--wrong"></li>`).join(``)}
            ${new Array(state.correctAnswers).fill(`<li class="stats__result stats__result--correct"></li>`).join(``)}
            ${new Array(state.gamesTotal - state.gameNumber).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
          </ul>
        </div>`);
};
