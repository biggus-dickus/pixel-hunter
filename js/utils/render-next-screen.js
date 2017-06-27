import {views, initialState, games} from '../data/gamedata';
import app from '../main';


/**
 * Renders next game screen or results (based on supplied game screen number; if there are lives left).
 * @param {Object} currentState
 * @param {number} currentScreen (if > 3, will be turned to 0)
 * @param {Object} newState
 * @param {number} count
 */
export default (currentState, currentScreen, newState, count) => {
  count++;

  currentState = Object.assign({}, initialState, {
    template: views.game,
    gameType: games[currentScreen],
    gameNumber: count,
    lives: newState.livesCount,
    correctAnswers: newState.correctCount,
    incorrectAnswers: newState.incorrectCount,
    slowAnswers: newState.slowCount,
    fastAnswers: newState.fastCount
  });

  if (count < currentState.gamesTotal && currentState.lives > 0) {
    app.showGame(currentState);
  } else {
    currentState.template = views.stats;
    app.showStats(currentState);
  }
};
